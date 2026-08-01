let c, w, y, u, S, m, Us, Os;
let __tla = (async () => {
  const B = "" + new URL("aoe2rec_js_bg-mYHqVZN7.wasm", import.meta.url).href, C = async (t = {}, _) => {
    let s;
    if (_.startsWith("data:")) {
      const r = _.replace(/^data:.*?base64,/, "");
      let g;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") g = Buffer.from(r, "base64");
      else if (typeof atob == "function") {
        const i = atob(r);
        g = new Uint8Array(i.length);
        for (let n = 0; n < i.length; n++) g[n] = i.charCodeAt(n);
      } else throw new Error("Cannot decode base64-encoded data URL");
      s = await WebAssembly.instantiate(g, t);
    } else {
      const r = await fetch(_), g = r.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && g.startsWith("application/wasm")) s = await WebAssembly.instantiateStreaming(r, t);
      else {
        const i = await r.arrayBuffer();
        s = await WebAssembly.instantiate(i, t);
      }
    }
    return s.instance.exports;
  };
  c = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const s = Object.create(c.prototype);
      return s.__wbg_ptr = _, O.register(s, s.__wbg_ptr, s), s;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, O.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      e.__wbg_gamesettings_free(_, 0);
    }
    get all_techs() {
      return e.__wbg_get_gamesettings_all_techs(this.__wbg_ptr) !== 0;
    }
    get allow_specs() {
      return e.__wbg_get_gamesettings_allow_specs(this.__wbg_ptr) !== 0;
    }
    get battle_royale_time() {
      return e.__wbg_get_gamesettings_battle_royale_time(this.__wbg_ptr) >>> 0;
    }
    get cheats() {
      return e.__wbg_get_gamesettings_cheats(this.__wbg_ptr) !== 0;
    }
    get difficulty() {
      return e.__wbg_get_gamesettings_difficulty(this.__wbg_ptr);
    }
    get ending_age_id() {
      return e.__wbg_get_gamesettings_ending_age_id(this.__wbg_ptr) >>> 0;
    }
    get fog_of_war() {
      return e.__wbg_get_gamesettings_fog_of_war(this.__wbg_ptr) !== 0;
    }
    get game_type() {
      return e.__wbg_get_gamesettings_game_type(this.__wbg_ptr) >>> 0;
    }
    get handicap() {
      return e.__wbg_get_gamesettings_handicap(this.__wbg_ptr) !== 0;
    }
    get hidden_civs() {
      return e.__wbg_get_gamesettings_hidden_civs(this.__wbg_ptr) !== 0;
    }
    get lobby_name() {
      let _, s;
      try {
        const r = e.__wbg_get_gamesettings_lobby_name(this.__wbg_ptr);
        return _ = r[0], s = r[1], p(r[0], r[1]);
      } finally {
        e.__wbindgen_free(_, s, 1);
      }
    }
    get lobby_visibility() {
      return e.__wbg_get_gamesettings_lobby_visibility(this.__wbg_ptr) >>> 0;
    }
    get lock_speed() {
      return e.__wbg_get_gamesettings_lock_speed(this.__wbg_ptr) !== 0;
    }
    get lock_teams() {
      return e.__wbg_get_gamesettings_lock_teams(this.__wbg_ptr) !== 0;
    }
    get map_size() {
      return e.__wbg_get_gamesettings_map_size(this.__wbg_ptr) >>> 0;
    }
    get matchmaking() {
      return e.__wbg_get_gamesettings_matchmaking(this.__wbg_ptr) !== 0;
    }
    get modded_dataset() {
      let _, s;
      try {
        const r = e.__wbg_get_gamesettings_modded_dataset(this.__wbg_ptr);
        return _ = r[0], s = r[1], p(r[0], r[1]);
      } finally {
        e.__wbindgen_free(_, s, 1);
      }
    }
    get multiplayer() {
      return e.__wbg_get_gamesettings_multiplayer(this.__wbg_ptr) !== 0;
    }
    get n_players() {
      return e.__wbg_get_gamesettings_n_players(this.__wbg_ptr) >>> 0;
    }
    get num_starting_units() {
      return e.__wbg_get_gamesettings_num_starting_units(this.__wbg_ptr);
    }
    get population_limit() {
      return e.__wbg_get_gamesettings_population_limit(this.__wbg_ptr) >>> 0;
    }
    get random_positions() {
      return e.__wbg_get_gamesettings_random_positions(this.__wbg_ptr) !== 0;
    }
    get ranked() {
      return e.__wbg_get_gamesettings_ranked(this.__wbg_ptr) !== 0;
    }
    get record_game() {
      return e.__wbg_get_gamesettings_record_game(this.__wbg_ptr) !== 0;
    }
    get resolved_map_id() {
      return e.__wbg_get_gamesettings_resolved_map_id(this.__wbg_ptr) >>> 0;
    }
    get reveal_map() {
      return e.__wbg_get_gamesettings_reveal_map(this.__wbg_ptr) >>> 0;
    }
    get rms_strings() {
      const _ = e.__wbg_get_gamesettings_rms_strings(this.__wbg_ptr);
      var s = R(_[0], _[1]).slice();
      return e.__wbindgen_free(_[0], _[1] * 4, 4), s;
    }
    get scenario_civ() {
      return e.__wbg_get_gamesettings_scenario_civ(this.__wbg_ptr) !== 0;
    }
    get selected_map_id() {
      return e.__wbg_get_gamesettings_selected_map_id(this.__wbg_ptr) >>> 0;
    }
    get shared_exploration() {
      return e.__wbg_get_gamesettings_shared_exploration(this.__wbg_ptr) !== 0;
    }
    get spec_delay() {
      return e.__wbg_get_gamesettings_spec_delay(this.__wbg_ptr) >>> 0;
    }
    get speed() {
      return e.__wbg_get_gamesettings_speed(this.__wbg_ptr);
    }
    get starting_age_id() {
      return e.__wbg_get_gamesettings_starting_age_id(this.__wbg_ptr) >>> 0;
    }
    get starting_resources_id() {
      return e.__wbg_get_gamesettings_starting_resources_id(this.__wbg_ptr) >>> 0;
    }
    get sub_game_mode() {
      return e.__wbg_get_gamesettings_sub_game_mode(this.__wbg_ptr) >>> 0;
    }
    get team_bonus_disabled() {
      return e.__wbg_get_gamesettings_team_bonus_disabled(this.__wbg_ptr) !== 0;
    }
    get team_positions() {
      return e.__wbg_get_gamesettings_team_positions(this.__wbg_ptr) !== 0;
    }
    get trade_enabled() {
      return e.__wbg_get_gamesettings_trade_enabled(this.__wbg_ptr) !== 0;
    }
    get treaty_length() {
      return e.__wbg_get_gamesettings_treaty_length(this.__wbg_ptr) >>> 0;
    }
    get victory_amount() {
      return e.__wbg_get_gamesettings_victory_amount(this.__wbg_ptr);
    }
    get victory_type_id() {
      return e.__wbg_get_gamesettings_victory_type_id(this.__wbg_ptr) >>> 0;
    }
    set all_techs(_) {
      e.__wbg_set_gamesettings_all_techs(this.__wbg_ptr, _);
    }
    set allow_specs(_) {
      e.__wbg_set_gamesettings_allow_specs(this.__wbg_ptr, _);
    }
    set battle_royale_time(_) {
      e.__wbg_set_gamesettings_battle_royale_time(this.__wbg_ptr, _);
    }
    set cheats(_) {
      e.__wbg_set_gamesettings_cheats(this.__wbg_ptr, _);
    }
    set difficulty(_) {
      e.__wbg_set_gamesettings_difficulty(this.__wbg_ptr, _);
    }
    set ending_age_id(_) {
      e.__wbg_set_gamesettings_ending_age_id(this.__wbg_ptr, _);
    }
    set fog_of_war(_) {
      e.__wbg_set_gamesettings_fog_of_war(this.__wbg_ptr, _);
    }
    set game_type(_) {
      e.__wbg_set_gamesettings_game_type(this.__wbg_ptr, _);
    }
    set handicap(_) {
      e.__wbg_set_gamesettings_handicap(this.__wbg_ptr, _);
    }
    set hidden_civs(_) {
      e.__wbg_set_gamesettings_hidden_civs(this.__wbg_ptr, _);
    }
    set lobby_name(_) {
      const s = l(_, e.__wbindgen_malloc, e.__wbindgen_realloc), r = a;
      e.__wbg_set_gamesettings_lobby_name(this.__wbg_ptr, s, r);
    }
    set lobby_visibility(_) {
      e.__wbg_set_gamesettings_lobby_visibility(this.__wbg_ptr, _);
    }
    set lock_speed(_) {
      e.__wbg_set_gamesettings_lock_speed(this.__wbg_ptr, _);
    }
    set lock_teams(_) {
      e.__wbg_set_gamesettings_lock_teams(this.__wbg_ptr, _);
    }
    set map_size(_) {
      e.__wbg_set_gamesettings_map_size(this.__wbg_ptr, _);
    }
    set matchmaking(_) {
      e.__wbg_set_gamesettings_matchmaking(this.__wbg_ptr, _);
    }
    set modded_dataset(_) {
      const s = l(_, e.__wbindgen_malloc, e.__wbindgen_realloc), r = a;
      e.__wbg_set_gamesettings_modded_dataset(this.__wbg_ptr, s, r);
    }
    set multiplayer(_) {
      e.__wbg_set_gamesettings_multiplayer(this.__wbg_ptr, _);
    }
    set n_players(_) {
      e.__wbg_set_gamesettings_n_players(this.__wbg_ptr, _);
    }
    set num_starting_units(_) {
      e.__wbg_set_gamesettings_num_starting_units(this.__wbg_ptr, _);
    }
    set population_limit(_) {
      e.__wbg_set_gamesettings_population_limit(this.__wbg_ptr, _);
    }
    set random_positions(_) {
      e.__wbg_set_gamesettings_random_positions(this.__wbg_ptr, _);
    }
    set ranked(_) {
      e.__wbg_set_gamesettings_ranked(this.__wbg_ptr, _);
    }
    set record_game(_) {
      e.__wbg_set_gamesettings_record_game(this.__wbg_ptr, _);
    }
    set resolved_map_id(_) {
      e.__wbg_set_gamesettings_resolved_map_id(this.__wbg_ptr, _);
    }
    set reveal_map(_) {
      e.__wbg_set_gamesettings_reveal_map(this.__wbg_ptr, _);
    }
    set rms_strings(_) {
      const s = U(_, e.__wbindgen_malloc), r = a;
      e.__wbg_set_gamesettings_rms_strings(this.__wbg_ptr, s, r);
    }
    set scenario_civ(_) {
      e.__wbg_set_gamesettings_scenario_civ(this.__wbg_ptr, _);
    }
    set selected_map_id(_) {
      e.__wbg_set_gamesettings_selected_map_id(this.__wbg_ptr, _);
    }
    set shared_exploration(_) {
      e.__wbg_set_gamesettings_shared_exploration(this.__wbg_ptr, _);
    }
    set spec_delay(_) {
      e.__wbg_set_gamesettings_spec_delay(this.__wbg_ptr, _);
    }
    set speed(_) {
      e.__wbg_set_gamesettings_speed(this.__wbg_ptr, _);
    }
    set starting_age_id(_) {
      e.__wbg_set_gamesettings_starting_age_id(this.__wbg_ptr, _);
    }
    set starting_resources_id(_) {
      e.__wbg_set_gamesettings_starting_resources_id(this.__wbg_ptr, _);
    }
    set sub_game_mode(_) {
      e.__wbg_set_gamesettings_sub_game_mode(this.__wbg_ptr, _);
    }
    set team_bonus_disabled(_) {
      e.__wbg_set_gamesettings_team_bonus_disabled(this.__wbg_ptr, _);
    }
    set team_positions(_) {
      e.__wbg_set_gamesettings_team_positions(this.__wbg_ptr, _);
    }
    set trade_enabled(_) {
      e.__wbg_set_gamesettings_trade_enabled(this.__wbg_ptr, _);
    }
    set treaty_length(_) {
      e.__wbg_set_gamesettings_treaty_length(this.__wbg_ptr, _);
    }
    set victory_amount(_) {
      e.__wbg_set_gamesettings_victory_amount(this.__wbg_ptr, _);
    }
    set victory_type_id(_) {
      e.__wbg_set_gamesettings_victory_type_id(this.__wbg_ptr, _);
    }
  };
  Symbol.dispose && (c.prototype[Symbol.dispose] = c.prototype.free);
  w = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const s = Object.create(w.prototype);
      return s.__wbg_ptr = _, T.register(s, s.__wbg_ptr, s), s;
    }
    static __unwrap(_) {
      return _ instanceof w ? _.__destroy_into_raw() : 0;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, T.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      e.__wbg_player_free(_, 0);
    }
    get civ_id() {
      return e.__wbg_get_player_civ_id(this.__wbg_ptr) >>> 0;
    }
    get color_id() {
      return e.__wbg_get_player_color_id(this.__wbg_ptr);
    }
    get custom_civ_ids() {
      const _ = e.__wbg_get_player_custom_civ_ids(this.__wbg_ptr);
      var s = i_(_[0], _[1]).slice();
      return e.__wbindgen_free(_[0], _[1] * 4, 4), s;
    }
    get name() {
      let _, s;
      try {
        const r = e.__wbg_get_player_name(this.__wbg_ptr);
        return _ = r[0], s = r[1], p(r[0], r[1]);
      } finally {
        e.__wbindgen_free(_, s, 1);
      }
    }
    get player_number() {
      return e.__wbg_get_player_player_number(this.__wbg_ptr);
    }
    get player_type() {
      return e.__wbg_get_player_player_type(this.__wbg_ptr) >>> 0;
    }
    get prefer_random() {
      return e.__wbg_get_player_prefer_random(this.__wbg_ptr) !== 0;
    }
    get profile_id() {
      return e.__wbg_get_gamesettings_difficulty(this.__wbg_ptr);
    }
    get resigned() {
      return e.__wbg_get_player_resigned(this.__wbg_ptr) !== 0;
    }
    get resolved_team_id() {
      return e.__wbg_get_player_resolved_team_id(this.__wbg_ptr);
    }
    get selected_color() {
      return e.__wbg_get_player_selected_color(this.__wbg_ptr);
    }
    get selected_team_id() {
      return e.__wbg_get_player_selected_team_id(this.__wbg_ptr);
    }
    set civ_id(_) {
      e.__wbg_set_player_civ_id(this.__wbg_ptr, _);
    }
    set color_id(_) {
      e.__wbg_set_player_color_id(this.__wbg_ptr, _);
    }
    set custom_civ_ids(_) {
      const s = w_(_, e.__wbindgen_malloc), r = a;
      e.__wbg_set_player_custom_civ_ids(this.__wbg_ptr, s, r);
    }
    set name(_) {
      const s = l(_, e.__wbindgen_malloc, e.__wbindgen_realloc), r = a;
      e.__wbg_set_player_name(this.__wbg_ptr, s, r);
    }
    set player_number(_) {
      e.__wbg_set_gamesettings_map_size(this.__wbg_ptr, _);
    }
    set player_type(_) {
      e.__wbg_set_player_player_type(this.__wbg_ptr, _);
    }
    set prefer_random(_) {
      e.__wbg_set_player_prefer_random(this.__wbg_ptr, _);
    }
    set profile_id(_) {
      e.__wbg_set_gamesettings_difficulty(this.__wbg_ptr, _);
    }
    set resigned(_) {
      e.__wbg_set_player_resigned(this.__wbg_ptr, _);
    }
    set resolved_team_id(_) {
      e.__wbg_set_player_resolved_team_id(this.__wbg_ptr, _);
    }
    set selected_color(_) {
      e.__wbg_set_player_selected_color(this.__wbg_ptr, _);
    }
    set selected_team_id(_) {
      e.__wbg_set_player_selected_team_id(this.__wbg_ptr, _);
    }
  };
  Symbol.dispose && (w.prototype[Symbol.dispose] = w.prototype.free);
  y = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const s = Object.create(y.prototype);
      return s.__wbg_ptr = _, W.register(s, s.__wbg_ptr, s), s;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, W.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      e.__wbg_replay_free(_, 0);
    }
    get cheats_enabled() {
      return e.__wbg_get_replay_cheats_enabled(this.__wbg_ptr) !== 0;
    }
    get game_mode() {
      return e.__wbg_get_replay_game_mode(this.__wbg_ptr);
    }
    get game_speed_id() {
      return e.__wbg_get_replay_game_speed_id(this.__wbg_ptr) >>> 0;
    }
    get game_speed() {
      return e.__wbg_get_replay_game_speed(this.__wbg_ptr);
    }
    get instant_build() {
      return e.__wbg_get_replay_instant_build(this.__wbg_ptr) !== 0;
    }
    get num_players() {
      return e.__wbg_get_replay_num_players(this.__wbg_ptr);
    }
    get old_time() {
      return e.__wbg_get_replay_old_time(this.__wbg_ptr) >>> 0;
    }
    get old_world_time() {
      return e.__wbg_get_replay_old_world_time(this.__wbg_ptr) >>> 0;
    }
    get random_seed_2() {
      return e.__wbg_get_player_player_type(this.__wbg_ptr) >>> 0;
    }
    get random_seed() {
      return e.__wbg_get_player_civ_id(this.__wbg_ptr) >>> 0;
    }
    get rec_player() {
      return e.__wbg_get_replay_rec_player(this.__wbg_ptr);
    }
    get temp_pause() {
      return e.__wbg_get_replay_temp_pause(this.__wbg_ptr) !== 0;
    }
    get timer() {
      return e.__wbg_get_replay_timer(this.__wbg_ptr);
    }
    get world_time_delta_seconds() {
      return e.__wbg_get_replay_world_time_delta_seconds(this.__wbg_ptr) >>> 0;
    }
    get world_time() {
      return e.__wbg_get_replay_world_time(this.__wbg_ptr) >>> 0;
    }
    set cheats_enabled(_) {
      e.__wbg_set_replay_cheats_enabled(this.__wbg_ptr, _);
    }
    set game_mode(_) {
      e.__wbg_set_replay_game_mode(this.__wbg_ptr, _);
    }
    set game_speed_id(_) {
      e.__wbg_set_replay_game_speed_id(this.__wbg_ptr, _);
    }
    set game_speed(_) {
      e.__wbg_set_replay_game_speed(this.__wbg_ptr, _);
    }
    set instant_build(_) {
      e.__wbg_set_replay_instant_build(this.__wbg_ptr, _);
    }
    set num_players(_) {
      e.__wbg_set_replay_num_players(this.__wbg_ptr, _);
    }
    set old_time(_) {
      e.__wbg_set_replay_old_time(this.__wbg_ptr, _);
    }
    set old_world_time(_) {
      e.__wbg_set_replay_old_world_time(this.__wbg_ptr, _);
    }
    set random_seed_2(_) {
      e.__wbg_set_player_player_type(this.__wbg_ptr, _);
    }
    set random_seed(_) {
      e.__wbg_set_player_civ_id(this.__wbg_ptr, _);
    }
    set rec_player(_) {
      e.__wbg_set_replay_rec_player(this.__wbg_ptr, _);
    }
    set temp_pause(_) {
      e.__wbg_set_replay_temp_pause(this.__wbg_ptr, _);
    }
    set timer(_) {
      e.__wbg_set_replay_timer(this.__wbg_ptr, _);
    }
    set world_time_delta_seconds(_) {
      e.__wbg_set_replay_world_time_delta_seconds(this.__wbg_ptr, _);
    }
    set world_time(_) {
      e.__wbg_set_replay_world_time(this.__wbg_ptr, _);
    }
  };
  Symbol.dispose && (y.prototype[Symbol.dispose] = y.prototype.free);
  u = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const s = Object.create(u.prototype);
      return s.__wbg_ptr = _, E.register(s, s.__wbg_ptr, s), s;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, E.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      e.__wbg_savegameheader_free(_, 0);
    }
    get build() {
      return e.__wbg_get_savegameheader_build(this.__wbg_ptr) >>> 0;
    }
    get game_settings() {
      const _ = e.__wbg_get_savegameheader_game_settings(this.__wbg_ptr);
      return c.__wrap(_);
    }
    get game_string() {
      let _, s;
      try {
        const r = e.__wbg_get_savegameheader_game_string(this.__wbg_ptr);
        return _ = r[0], s = r[1], p(r[0], r[1]);
      } finally {
        e.__wbindgen_free(_, s, 1);
      }
    }
    get replay() {
      const _ = e.__wbg_get_savegameheader_replay(this.__wbg_ptr);
      return y.__wrap(_);
    }
    get timestamp() {
      return e.__wbg_get_savegameheader_timestamp(this.__wbg_ptr);
    }
    get version_major() {
      return e.__wbg_get_savegameheader_version_major(this.__wbg_ptr);
    }
    get version_minor() {
      return e.__wbg_get_savegameheader_version_minor(this.__wbg_ptr);
    }
    set build(_) {
      e.__wbg_set_savegameheader_build(this.__wbg_ptr, _);
    }
    set game_settings(_) {
      z(_, c);
      var s = _.__destroy_into_raw();
      e.__wbg_set_savegameheader_game_settings(this.__wbg_ptr, s);
    }
    set game_string(_) {
      const s = l(_, e.__wbindgen_malloc, e.__wbindgen_realloc), r = a;
      e.__wbg_set_player_name(this.__wbg_ptr, s, r);
    }
    set replay(_) {
      z(_, y);
      var s = _.__destroy_into_raw();
      e.__wbg_set_savegameheader_replay(this.__wbg_ptr, s);
    }
    set timestamp(_) {
      e.__wbg_set_savegameheader_timestamp(this.__wbg_ptr, _);
    }
    set version_major(_) {
      e.__wbg_set_savegameheader_version_major(this.__wbg_ptr, _);
    }
    set version_minor(_) {
      e.__wbg_set_savegameheader_version_minor(this.__wbg_ptr, _);
    }
  };
  Symbol.dispose && (u.prototype[Symbol.dispose] = u.prototype.free);
  S = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const s = Object.create(S.prototype);
      return s.__wbg_ptr = _, M.register(s, s.__wbg_ptr, s), s;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, M.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      e.__wbg_savegamesummary_free(_, 0);
    }
    get duration() {
      return e.__wbg_get_savegamesummary_duration(this.__wbg_ptr) >>> 0;
    }
    get header() {
      const _ = e.__wbg_get_savegamesummary_header(this.__wbg_ptr);
      return u.__wrap(_);
    }
    get teams() {
      const _ = e.__wbg_get_savegamesummary_teams(this.__wbg_ptr);
      var s = R(_[0], _[1]).slice();
      return e.__wbindgen_free(_[0], _[1] * 4, 4), s;
    }
    set duration(_) {
      e.__wbg_set_savegamesummary_duration(this.__wbg_ptr, _);
    }
    set header(_) {
      z(_, u);
      var s = _.__destroy_into_raw();
      e.__wbg_set_savegamesummary_header(this.__wbg_ptr, s);
    }
    set teams(_) {
      const s = U(_, e.__wbindgen_malloc), r = a;
      e.__wbg_set_savegamesummary_teams(this.__wbg_ptr, s, r);
    }
  };
  Symbol.dispose && (S.prototype[Symbol.dispose] = S.prototype.free);
  m = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const s = Object.create(m.prototype);
      return s.__wbg_ptr = _, I.register(s, s.__wbg_ptr, s), s;
    }
    static __unwrap(_) {
      return _ instanceof m ? _.__destroy_into_raw() : 0;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, I.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      e.__wbg_team_free(_, 0);
    }
    get players() {
      const _ = e.__wbg_get_team_players(this.__wbg_ptr);
      var s = R(_[0], _[1]).slice();
      return e.__wbindgen_free(_[0], _[1] * 4, 4), s;
    }
    get winner() {
      return e.__wbg_get_team_winner(this.__wbg_ptr) !== 0;
    }
    set players(_) {
      const s = U(_, e.__wbindgen_malloc), r = a;
      e.__wbg_set_team_players(this.__wbg_ptr, s, r);
    }
    set winner(_) {
      e.__wbg_set_team_winner(this.__wbg_ptr, _);
    }
  };
  Symbol.dispose && (m.prototype[Symbol.dispose] = m.prototype.free);
  Us = function(t) {
    return e.parse_rec(t);
  };
  Os = function(t) {
    const _ = e.parse_rec_summary(t);
    return S.__wrap(_);
  };
  function L(t, _) {
    const s = F(_), r = l(s, e.__wbindgen_malloc, e.__wbindgen_realloc), g = a;
    o().setInt32(t + 4, g, true), o().setInt32(t + 0, r, true);
  }
  function N(t, _) {
    const s = _, r = typeof s == "string" ? s : void 0;
    var g = o_(r) ? 0 : l(r, e.__wbindgen_malloc, e.__wbindgen_realloc), i = a;
    o().setInt32(t + 4, i, true), o().setInt32(t + 0, g, true);
  }
  function V(t, _) {
    throw new Error(p(t, _));
  }
  function J(t, _) {
    let s, r;
    try {
      s = t, r = _, console.error(p(t, _));
    } finally {
      e.__wbindgen_free(s, r, 1);
    }
  }
  function H(t) {
    return t.length;
  }
  function Y() {
    return new Object();
  }
  function q() {
    return new Array();
  }
  function G() {
    return new Error();
  }
  function P(t) {
    return new Uint8Array(t);
  }
  function X(t) {
    return w.__wrap(t);
  }
  function Z(t) {
    return w.__unwrap(t);
  }
  function K(t, _, s) {
    Uint8Array.prototype.set.call(b_(t, _), s);
  }
  function Q(t, _, s) {
    t[_] = s;
  }
  function __(t, _, s) {
    t[_ >>> 0] = s;
  }
  function e_(t, _) {
    const s = _.stack, r = l(s, e.__wbindgen_malloc, e.__wbindgen_realloc), g = a;
    o().setInt32(t + 4, g, true), o().setInt32(t + 0, r, true);
  }
  function t_(t) {
    return m.__wrap(t);
  }
  function s_(t) {
    return m.__unwrap(t);
  }
  function r_(t) {
    return t;
  }
  function g_(t, _) {
    return p(t, _);
  }
  function n_() {
    const t = e.__wbindgen_externrefs, _ = t.grow(4);
    t.set(0, void 0), t.set(_ + 0, void 0), t.set(_ + 1, null), t.set(_ + 2, true), t.set(_ + 3, false);
  }
  const O = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => e.__wbg_gamesettings_free(t >>> 0, 1)), T = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => e.__wbg_player_free(t >>> 0, 1)), W = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => e.__wbg_replay_free(t >>> 0, 1)), E = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => e.__wbg_savegameheader_free(t >>> 0, 1)), M = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => e.__wbg_savegamesummary_free(t >>> 0, 1)), I = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => e.__wbg_team_free(t >>> 0, 1));
  function a_(t) {
    const _ = e.__externref_table_alloc();
    return e.__wbindgen_externrefs.set(_, t), _;
  }
  function z(t, _) {
    if (!(t instanceof _)) throw new Error(`expected instance of ${_.name}`);
  }
  function F(t) {
    const _ = typeof t;
    if (_ == "number" || _ == "boolean" || t == null) return `${t}`;
    if (_ == "string") return `"${t}"`;
    if (_ == "symbol") {
      const g = t.description;
      return g == null ? "Symbol" : `Symbol(${g})`;
    }
    if (_ == "function") {
      const g = t.name;
      return typeof g == "string" && g.length > 0 ? `Function(${g})` : "Function";
    }
    if (Array.isArray(t)) {
      const g = t.length;
      let i = "[";
      g > 0 && (i += F(t[0]));
      for (let n = 1; n < g; n++) i += ", " + F(t[n]);
      return i += "]", i;
    }
    const s = /\[object ([^\]]+)\]/.exec(toString.call(t));
    let r;
    if (s && s.length > 1) r = s[1];
    else return toString.call(t);
    if (r == "Object") try {
      return "Object(" + JSON.stringify(t) + ")";
    } catch {
      return "Object";
    }
    return t instanceof Error ? `${t.name}: ${t.message}
${t.stack}` : r;
  }
  function R(t, _) {
    t = t >>> 0;
    const s = o(), r = [];
    for (let g = t; g < t + 4 * _; g += 4) r.push(e.__wbindgen_externrefs.get(s.getUint32(g, true)));
    return e.__externref_drop_slice(t, _), r;
  }
  function i_(t, _) {
    return t = t >>> 0, $().subarray(t / 4, t / 4 + _);
  }
  function b_(t, _) {
    return t = t >>> 0, f().subarray(t / 1, t / 1 + _);
  }
  let d = null;
  function o() {
    return (d === null || d.buffer.detached === true || d.buffer.detached === void 0 && d.buffer !== e.memory.buffer) && (d = new DataView(e.memory.buffer)), d;
  }
  function p(t, _) {
    return t = t >>> 0, p_(t, _);
  }
  let k = null;
  function $() {
    return (k === null || k.byteLength === 0) && (k = new Uint32Array(e.memory.buffer)), k;
  }
  let x = null;
  function f() {
    return (x === null || x.byteLength === 0) && (x = new Uint8Array(e.memory.buffer)), x;
  }
  function o_(t) {
    return t == null;
  }
  function w_(t, _) {
    const s = _(t.length * 4, 4) >>> 0;
    return $().set(t, s / 4), a = t.length, s;
  }
  function U(t, _) {
    const s = _(t.length * 4, 4) >>> 0;
    for (let r = 0; r < t.length; r++) {
      const g = a_(t[r]);
      o().setUint32(s + 4 * r, g, true);
    }
    return a = t.length, s;
  }
  function l(t, _, s) {
    if (s === void 0) {
      const b = v.encode(t), h = _(b.length, 1) >>> 0;
      return f().subarray(h, h + b.length).set(b), a = b.length, h;
    }
    let r = t.length, g = _(r, 1) >>> 0;
    const i = f();
    let n = 0;
    for (; n < r; n++) {
      const b = t.charCodeAt(n);
      if (b > 127) break;
      i[g + n] = b;
    }
    if (n !== r) {
      n !== 0 && (t = t.slice(n)), g = s(g, r, r = n + t.length * 3, 1) >>> 0;
      const b = f().subarray(g + n, g + r), h = v.encodeInto(t, b);
      n += h.written, g = s(g, r, n, 1) >>> 0;
    }
    return a = n, g;
  }
  let j = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  j.decode();
  const m_ = 2146435072;
  let A = 0;
  function p_(t, _) {
    return A += _, A >= m_ && (j = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), j.decode(), A = _), j.decode(f().subarray(t, t + _));
  }
  const v = new TextEncoder();
  "encodeInto" in v || (v.encodeInto = function(t, _) {
    const s = v.encode(t);
    return _.set(s), {
      read: t.length,
      written: s.length
    };
  });
  let a = 0, e;
  function l_(t) {
    e = t;
  }
  URL = globalThis.URL;
  const d_ = await C({
    "./aoe2rec_js_bg.js": {
      __wbg_team_unwrap: s_,
      __wbg_player_unwrap: Z,
      __wbg_team_new: t_,
      __wbg_player_new: X,
      __wbg_set_3f1d0b984ed272ed: Q,
      __wbg_new_8a6f238a6ece86ea: G,
      __wbg_stack_0ed75d68575b0f3c: e_,
      __wbg_error_7534b8e9a36f1ab4: J,
      __wbg_new_3eb36ae241fe6f44: q,
      __wbg_new_361308b2356cecd0: Y,
      __wbg_new_dd2b680c8bf6ae29: P,
      __wbg_length_32ed9a279acd054c: H,
      __wbg_prototypesetcall_bdcdcc5842e4d77d: K,
      __wbg_set_f43e577aea94465b: __,
      __wbg___wbindgen_throw_be289d5034ed271b: V,
      __wbg___wbindgen_string_get_72fb696202c56729: N,
      __wbg___wbindgen_debug_string_0bc8482c6e3508ae: L,
      __wbindgen_init_externref_table: n_,
      __wbindgen_cast_0000000000000001: r_,
      __wbindgen_cast_0000000000000002: g_
    }
  }, B), { memory: c_, __wbg_gamesettings_free: y_, __wbg_get_gamesettings_all_techs: u_, __wbg_get_gamesettings_allow_specs: h_, __wbg_get_gamesettings_battle_royale_time: f_, __wbg_get_gamesettings_cheats: v_, __wbg_get_gamesettings_difficulty: S_, __wbg_get_gamesettings_ending_age_id: k_, __wbg_get_gamesettings_fog_of_war: x_, __wbg_get_gamesettings_game_type: j_, __wbg_get_gamesettings_handicap: A_, __wbg_get_gamesettings_hidden_civs: z_, __wbg_get_gamesettings_lobby_name: F_, __wbg_get_gamesettings_lobby_visibility: R_, __wbg_get_gamesettings_lock_speed: U_, __wbg_get_gamesettings_lock_teams: O_, __wbg_get_gamesettings_map_size: T_, __wbg_get_gamesettings_matchmaking: W_, __wbg_get_gamesettings_modded_dataset: E_, __wbg_get_gamesettings_multiplayer: M_, __wbg_get_gamesettings_n_players: I_, __wbg_get_gamesettings_num_starting_units: $_, __wbg_get_gamesettings_population_limit: D_, __wbg_get_gamesettings_random_positions: B_, __wbg_get_gamesettings_ranked: C_, __wbg_get_gamesettings_record_game: L_, __wbg_get_gamesettings_resolved_map_id: N_, __wbg_get_gamesettings_reveal_map: V_, __wbg_get_gamesettings_rms_strings: J_, __wbg_get_gamesettings_scenario_civ: H_, __wbg_get_gamesettings_selected_map_id: Y_, __wbg_get_gamesettings_shared_exploration: q_, __wbg_get_gamesettings_spec_delay: G_, __wbg_get_gamesettings_speed: P_, __wbg_get_gamesettings_starting_age_id: X_, __wbg_get_gamesettings_starting_resources_id: Z_, __wbg_get_gamesettings_sub_game_mode: K_, __wbg_get_gamesettings_team_bonus_disabled: Q_, __wbg_get_gamesettings_team_positions: _e, __wbg_get_gamesettings_trade_enabled: ee, __wbg_get_gamesettings_treaty_length: te, __wbg_get_gamesettings_victory_amount: se, __wbg_get_gamesettings_victory_type_id: re, __wbg_get_player_civ_id: ge, __wbg_get_player_color_id: ne, __wbg_get_player_custom_civ_ids: ae, __wbg_get_player_name: ie, __wbg_get_player_player_number: be, __wbg_get_player_player_type: oe, __wbg_get_player_prefer_random: we, __wbg_get_player_resigned: me, __wbg_get_player_resolved_team_id: pe, __wbg_get_player_selected_color: le, __wbg_get_player_selected_team_id: de, __wbg_get_replay_cheats_enabled: ce, __wbg_get_replay_game_mode: ye, __wbg_get_replay_game_speed: ue, __wbg_get_replay_game_speed_id: he, __wbg_get_replay_instant_build: fe, __wbg_get_replay_num_players: ve, __wbg_get_replay_old_time: Se, __wbg_get_replay_old_world_time: ke, __wbg_get_replay_rec_player: xe, __wbg_get_replay_temp_pause: je, __wbg_get_replay_timer: Ae, __wbg_get_replay_world_time: ze, __wbg_get_replay_world_time_delta_seconds: Fe, __wbg_get_savegameheader_build: Re, __wbg_get_savegameheader_game_settings: Ue, __wbg_get_savegameheader_replay: Oe, __wbg_get_savegameheader_timestamp: Te, __wbg_get_savegameheader_version_major: We, __wbg_get_savegameheader_version_minor: Ee, __wbg_get_savegamesummary_duration: Me, __wbg_get_savegamesummary_header: Ie, __wbg_get_savegamesummary_teams: $e, __wbg_get_team_players: De, __wbg_get_team_winner: Be, __wbg_player_free: Ce, __wbg_replay_free: Le, __wbg_savegameheader_free: Ne, __wbg_savegamesummary_free: Ve, __wbg_set_gamesettings_all_techs: Je, __wbg_set_gamesettings_allow_specs: He, __wbg_set_gamesettings_battle_royale_time: Ye, __wbg_set_gamesettings_cheats: qe, __wbg_set_gamesettings_difficulty: Ge, __wbg_set_gamesettings_ending_age_id: Pe, __wbg_set_gamesettings_fog_of_war: Xe, __wbg_set_gamesettings_game_type: Ze, __wbg_set_gamesettings_handicap: Ke, __wbg_set_gamesettings_hidden_civs: Qe, __wbg_set_gamesettings_lobby_name: _t, __wbg_set_gamesettings_lobby_visibility: et, __wbg_set_gamesettings_lock_speed: tt, __wbg_set_gamesettings_lock_teams: st, __wbg_set_gamesettings_map_size: rt, __wbg_set_gamesettings_matchmaking: gt, __wbg_set_gamesettings_modded_dataset: nt, __wbg_set_gamesettings_multiplayer: at, __wbg_set_gamesettings_n_players: it, __wbg_set_gamesettings_num_starting_units: bt, __wbg_set_gamesettings_population_limit: ot, __wbg_set_gamesettings_random_positions: wt, __wbg_set_gamesettings_ranked: mt, __wbg_set_gamesettings_record_game: pt, __wbg_set_gamesettings_resolved_map_id: lt, __wbg_set_gamesettings_reveal_map: dt, __wbg_set_gamesettings_rms_strings: ct, __wbg_set_gamesettings_scenario_civ: yt, __wbg_set_gamesettings_selected_map_id: ut, __wbg_set_gamesettings_shared_exploration: ht, __wbg_set_gamesettings_spec_delay: ft, __wbg_set_gamesettings_speed: vt, __wbg_set_gamesettings_starting_age_id: St, __wbg_set_gamesettings_starting_resources_id: kt, __wbg_set_gamesettings_sub_game_mode: xt, __wbg_set_gamesettings_team_bonus_disabled: jt, __wbg_set_gamesettings_team_positions: At, __wbg_set_gamesettings_trade_enabled: zt, __wbg_set_gamesettings_treaty_length: Ft, __wbg_set_gamesettings_victory_amount: Rt, __wbg_set_gamesettings_victory_type_id: Ut, __wbg_set_player_civ_id: Ot, __wbg_set_player_color_id: Tt, __wbg_set_player_custom_civ_ids: Wt, __wbg_set_player_name: Et, __wbg_set_player_player_type: Mt, __wbg_set_player_prefer_random: It, __wbg_set_player_resigned: $t, __wbg_set_player_resolved_team_id: Dt, __wbg_set_player_selected_color: Bt, __wbg_set_player_selected_team_id: Ct, __wbg_set_replay_cheats_enabled: Lt, __wbg_set_replay_game_mode: Nt, __wbg_set_replay_game_speed: Vt, __wbg_set_replay_game_speed_id: Jt, __wbg_set_replay_instant_build: Ht, __wbg_set_replay_num_players: Yt, __wbg_set_replay_old_time: qt, __wbg_set_replay_old_world_time: Gt, __wbg_set_replay_rec_player: Pt, __wbg_set_replay_temp_pause: Xt, __wbg_set_replay_timer: Zt, __wbg_set_replay_world_time: Kt, __wbg_set_replay_world_time_delta_seconds: Qt, __wbg_set_savegameheader_build: _s, __wbg_set_savegameheader_game_settings: es, __wbg_set_savegameheader_replay: ts, __wbg_set_savegameheader_timestamp: ss, __wbg_set_savegameheader_version_major: rs, __wbg_set_savegameheader_version_minor: gs, __wbg_set_savegamesummary_duration: ns, __wbg_set_savegamesummary_header: as, __wbg_set_savegamesummary_teams: is, __wbg_set_team_players: bs, __wbg_set_team_winner: os, __wbg_team_free: ws, parse_rec: ms, parse_rec_summary: ps, __wbg_set_savegameheader_game_string: ls, __wbg_set_player_player_number: ds, __wbg_set_player_profile_id: cs, __wbg_set_replay_random_seed: ys, __wbg_set_replay_random_seed_2: us, __wbg_get_replay_random_seed: hs, __wbg_get_replay_random_seed_2: fs, __wbg_get_player_profile_id: vs, __wbg_get_savegameheader_game_string: Ss, __wbindgen_malloc: ks, __wbindgen_realloc: xs, __wbindgen_free: js, __wbindgen_externrefs: As, __externref_drop_slice: zs, __externref_table_alloc: Fs, __wbindgen_start: D } = d_, Rs = Object.freeze(Object.defineProperty({
    __proto__: null,
    __externref_drop_slice: zs,
    __externref_table_alloc: Fs,
    __wbg_gamesettings_free: y_,
    __wbg_get_gamesettings_all_techs: u_,
    __wbg_get_gamesettings_allow_specs: h_,
    __wbg_get_gamesettings_battle_royale_time: f_,
    __wbg_get_gamesettings_cheats: v_,
    __wbg_get_gamesettings_difficulty: S_,
    __wbg_get_gamesettings_ending_age_id: k_,
    __wbg_get_gamesettings_fog_of_war: x_,
    __wbg_get_gamesettings_game_type: j_,
    __wbg_get_gamesettings_handicap: A_,
    __wbg_get_gamesettings_hidden_civs: z_,
    __wbg_get_gamesettings_lobby_name: F_,
    __wbg_get_gamesettings_lobby_visibility: R_,
    __wbg_get_gamesettings_lock_speed: U_,
    __wbg_get_gamesettings_lock_teams: O_,
    __wbg_get_gamesettings_map_size: T_,
    __wbg_get_gamesettings_matchmaking: W_,
    __wbg_get_gamesettings_modded_dataset: E_,
    __wbg_get_gamesettings_multiplayer: M_,
    __wbg_get_gamesettings_n_players: I_,
    __wbg_get_gamesettings_num_starting_units: $_,
    __wbg_get_gamesettings_population_limit: D_,
    __wbg_get_gamesettings_random_positions: B_,
    __wbg_get_gamesettings_ranked: C_,
    __wbg_get_gamesettings_record_game: L_,
    __wbg_get_gamesettings_resolved_map_id: N_,
    __wbg_get_gamesettings_reveal_map: V_,
    __wbg_get_gamesettings_rms_strings: J_,
    __wbg_get_gamesettings_scenario_civ: H_,
    __wbg_get_gamesettings_selected_map_id: Y_,
    __wbg_get_gamesettings_shared_exploration: q_,
    __wbg_get_gamesettings_spec_delay: G_,
    __wbg_get_gamesettings_speed: P_,
    __wbg_get_gamesettings_starting_age_id: X_,
    __wbg_get_gamesettings_starting_resources_id: Z_,
    __wbg_get_gamesettings_sub_game_mode: K_,
    __wbg_get_gamesettings_team_bonus_disabled: Q_,
    __wbg_get_gamesettings_team_positions: _e,
    __wbg_get_gamesettings_trade_enabled: ee,
    __wbg_get_gamesettings_treaty_length: te,
    __wbg_get_gamesettings_victory_amount: se,
    __wbg_get_gamesettings_victory_type_id: re,
    __wbg_get_player_civ_id: ge,
    __wbg_get_player_color_id: ne,
    __wbg_get_player_custom_civ_ids: ae,
    __wbg_get_player_name: ie,
    __wbg_get_player_player_number: be,
    __wbg_get_player_player_type: oe,
    __wbg_get_player_prefer_random: we,
    __wbg_get_player_profile_id: vs,
    __wbg_get_player_resigned: me,
    __wbg_get_player_resolved_team_id: pe,
    __wbg_get_player_selected_color: le,
    __wbg_get_player_selected_team_id: de,
    __wbg_get_replay_cheats_enabled: ce,
    __wbg_get_replay_game_mode: ye,
    __wbg_get_replay_game_speed: ue,
    __wbg_get_replay_game_speed_id: he,
    __wbg_get_replay_instant_build: fe,
    __wbg_get_replay_num_players: ve,
    __wbg_get_replay_old_time: Se,
    __wbg_get_replay_old_world_time: ke,
    __wbg_get_replay_random_seed: hs,
    __wbg_get_replay_random_seed_2: fs,
    __wbg_get_replay_rec_player: xe,
    __wbg_get_replay_temp_pause: je,
    __wbg_get_replay_timer: Ae,
    __wbg_get_replay_world_time: ze,
    __wbg_get_replay_world_time_delta_seconds: Fe,
    __wbg_get_savegameheader_build: Re,
    __wbg_get_savegameheader_game_settings: Ue,
    __wbg_get_savegameheader_game_string: Ss,
    __wbg_get_savegameheader_replay: Oe,
    __wbg_get_savegameheader_timestamp: Te,
    __wbg_get_savegameheader_version_major: We,
    __wbg_get_savegameheader_version_minor: Ee,
    __wbg_get_savegamesummary_duration: Me,
    __wbg_get_savegamesummary_header: Ie,
    __wbg_get_savegamesummary_teams: $e,
    __wbg_get_team_players: De,
    __wbg_get_team_winner: Be,
    __wbg_player_free: Ce,
    __wbg_replay_free: Le,
    __wbg_savegameheader_free: Ne,
    __wbg_savegamesummary_free: Ve,
    __wbg_set_gamesettings_all_techs: Je,
    __wbg_set_gamesettings_allow_specs: He,
    __wbg_set_gamesettings_battle_royale_time: Ye,
    __wbg_set_gamesettings_cheats: qe,
    __wbg_set_gamesettings_difficulty: Ge,
    __wbg_set_gamesettings_ending_age_id: Pe,
    __wbg_set_gamesettings_fog_of_war: Xe,
    __wbg_set_gamesettings_game_type: Ze,
    __wbg_set_gamesettings_handicap: Ke,
    __wbg_set_gamesettings_hidden_civs: Qe,
    __wbg_set_gamesettings_lobby_name: _t,
    __wbg_set_gamesettings_lobby_visibility: et,
    __wbg_set_gamesettings_lock_speed: tt,
    __wbg_set_gamesettings_lock_teams: st,
    __wbg_set_gamesettings_map_size: rt,
    __wbg_set_gamesettings_matchmaking: gt,
    __wbg_set_gamesettings_modded_dataset: nt,
    __wbg_set_gamesettings_multiplayer: at,
    __wbg_set_gamesettings_n_players: it,
    __wbg_set_gamesettings_num_starting_units: bt,
    __wbg_set_gamesettings_population_limit: ot,
    __wbg_set_gamesettings_random_positions: wt,
    __wbg_set_gamesettings_ranked: mt,
    __wbg_set_gamesettings_record_game: pt,
    __wbg_set_gamesettings_resolved_map_id: lt,
    __wbg_set_gamesettings_reveal_map: dt,
    __wbg_set_gamesettings_rms_strings: ct,
    __wbg_set_gamesettings_scenario_civ: yt,
    __wbg_set_gamesettings_selected_map_id: ut,
    __wbg_set_gamesettings_shared_exploration: ht,
    __wbg_set_gamesettings_spec_delay: ft,
    __wbg_set_gamesettings_speed: vt,
    __wbg_set_gamesettings_starting_age_id: St,
    __wbg_set_gamesettings_starting_resources_id: kt,
    __wbg_set_gamesettings_sub_game_mode: xt,
    __wbg_set_gamesettings_team_bonus_disabled: jt,
    __wbg_set_gamesettings_team_positions: At,
    __wbg_set_gamesettings_trade_enabled: zt,
    __wbg_set_gamesettings_treaty_length: Ft,
    __wbg_set_gamesettings_victory_amount: Rt,
    __wbg_set_gamesettings_victory_type_id: Ut,
    __wbg_set_player_civ_id: Ot,
    __wbg_set_player_color_id: Tt,
    __wbg_set_player_custom_civ_ids: Wt,
    __wbg_set_player_name: Et,
    __wbg_set_player_player_number: ds,
    __wbg_set_player_player_type: Mt,
    __wbg_set_player_prefer_random: It,
    __wbg_set_player_profile_id: cs,
    __wbg_set_player_resigned: $t,
    __wbg_set_player_resolved_team_id: Dt,
    __wbg_set_player_selected_color: Bt,
    __wbg_set_player_selected_team_id: Ct,
    __wbg_set_replay_cheats_enabled: Lt,
    __wbg_set_replay_game_mode: Nt,
    __wbg_set_replay_game_speed: Vt,
    __wbg_set_replay_game_speed_id: Jt,
    __wbg_set_replay_instant_build: Ht,
    __wbg_set_replay_num_players: Yt,
    __wbg_set_replay_old_time: qt,
    __wbg_set_replay_old_world_time: Gt,
    __wbg_set_replay_random_seed: ys,
    __wbg_set_replay_random_seed_2: us,
    __wbg_set_replay_rec_player: Pt,
    __wbg_set_replay_temp_pause: Xt,
    __wbg_set_replay_timer: Zt,
    __wbg_set_replay_world_time: Kt,
    __wbg_set_replay_world_time_delta_seconds: Qt,
    __wbg_set_savegameheader_build: _s,
    __wbg_set_savegameheader_game_settings: es,
    __wbg_set_savegameheader_game_string: ls,
    __wbg_set_savegameheader_replay: ts,
    __wbg_set_savegameheader_timestamp: ss,
    __wbg_set_savegameheader_version_major: rs,
    __wbg_set_savegameheader_version_minor: gs,
    __wbg_set_savegamesummary_duration: ns,
    __wbg_set_savegamesummary_header: as,
    __wbg_set_savegamesummary_teams: is,
    __wbg_set_team_players: bs,
    __wbg_set_team_winner: os,
    __wbg_team_free: ws,
    __wbindgen_externrefs: As,
    __wbindgen_free: js,
    __wbindgen_malloc: ks,
    __wbindgen_realloc: xs,
    __wbindgen_start: D,
    memory: c_,
    parse_rec: ms,
    parse_rec_summary: ps
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  l_(Rs);
  D();
})();
export {
  c as GameSettings,
  w as Player,
  y as Replay,
  u as SavegameHeader,
  S as SavegameSummary,
  m as Team,
  __tla,
  Us as parse_rec,
  Os as parse_rec_summary
};
