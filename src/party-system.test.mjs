import assert from "node:assert/strict";
import test from "node:test";
import { completePartyTeam, createPartyStore, eligibleTeamSize, partyMatchmakingRating, PartyOperationError, validatePartyQueue } from "./party-system.mjs";

const player = (id) => ({ id, displayName: id, rating: 1000, teamRating: 1000 });

test("creator remains the only leader and membership is unique", () => {
  const store = createPartyStore();
  const party = store.create(player("leader"));
  const invite = store.invite(player("leader"), player("friend"));
  store.accept(invite.id, player("friend"));
  assert.equal(party.leaderId, "leader");
  assert.equal(store.snapshot("friend").party.isLeader, false);
  assert.throws(() => store.invite(player("friend"), player("third")), /Only the party leader/);
});

test("party chat is visible only through member snapshots", () => {
  const store = createPartyStore();
  store.create(player("leader"));
  const invite = store.invite(player("leader"), player("friend"));
  store.accept(invite.id, player("friend"));
  store.addMessage("friend", "ready when you are");
  assert.equal(store.snapshot("leader").party.messages.at(-1).text, "ready when you are");
  assert.equal(store.snapshot("outsider").party, null);
  assert.throws(() => store.addMessage("outsider", "nope"), PartyOperationError);
});

test("only complete parties of two, three, and four are queue eligible", () => {
  assert.equal(eligibleTeamSize(1), null);
  assert.equal(eligibleTeamSize(2), 2);
  assert.equal(eligibleTeamSize(3), 3);
  assert.equal(eligibleTeamSize(4), 4);
  const party = { leaderId: "leader", members: [player("leader"), player("friend")] };
  assert.equal(validatePartyQueue(party, { id: "team-games", format: "team", teamSizes: [2] }), 2);
  assert.throws(() => validatePartyQueue(party, { id: "ranked-rm-1v1", format: "1v1" }), /only queue for 2v2/);
  assert.throws(() => validatePartyQueue(party, { id: "team-games", format: "team", teamSizes: [4] }), /only queue for 2v2/);
  assert.throws(() => validatePartyQueue(party, { id: "ranked-rm-1v1", format: "team", teamSizes: [2] }), /only queue for 2v2/);

  const trio = { leaderId: "leader", members: [player("leader"), player("second"), player("third")] };
  assert.equal(validatePartyQueue(trio, { id: "team-games", format: "team", teamSizes: [3] }), 3);
  assert.throws(() => validatePartyQueue(trio, { id: "team-games", format: "team", teamSizes: [2, 4] }), /only queue for 3v3/);
});

test("membership cannot change while queued", () => {
  const store = createPartyStore();
  const party = store.create(player("leader"));
  const invite = store.invite(player("leader"), player("friend"));
  store.accept(invite.id, player("friend"));
  store.setActiveQueue(party.id, { id: "team", name: "Team Ranked" }, [["leader", "one"], ["friend", "two"]], new Date().toISOString());
  assert.throws(() => store.removeMember("friend", "friend"), /Leave matchmaking/);
  assert.throws(() => store.disband("leader"), /Leave matchmaking/);
});

test("premade matchmaking uses average Elo and keeps the complete party together", () => {
  const tickets = [
    { id: "low", partyId: "friends", queueId: "team-games", rating: 500, matchId: null },
    { id: "high", partyId: "friends", queueId: "team-games", rating: 1500, matchId: null },
    { id: "opponent", queueId: "team-games", rating: 1020, matchId: null }
  ];
  assert.equal(partyMatchmakingRating(tickets[0], tickets, (ticket) => ticket.rating), 1000);
  assert.equal(partyMatchmakingRating(tickets[2], tickets, (ticket) => ticket.rating), 1020);
  assert.deepEqual(completePartyTeam(tickets, 2)?.map((ticket) => ticket.id), ["low", "high"]);

  const trio = [
    { id: "one", partyId: "trio", queueId: "team-games", rating: 800, matchId: null },
    { id: "two", partyId: "trio", queueId: "team-games", rating: 1100, matchId: null },
    { id: "three", partyId: "trio", queueId: "team-games", rating: 1400, matchId: null },
    { id: "outsider", queueId: "team-games", rating: 1100, matchId: null }
  ];
  assert.equal(partyMatchmakingRating(trio[0], trio, (ticket) => ticket.rating), 1100);
  assert.deepEqual(completePartyTeam(trio, 3)?.map((ticket) => ticket.id), ["one", "two", "three"]);
});
