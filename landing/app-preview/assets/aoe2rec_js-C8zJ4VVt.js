let y, m, u, h, x, c, Us, Os;
let __tla = (async () => {
  const C = "" + new URL("aoe2rec_js_bg-mYHqVZN7.wasm", import.meta.url).href, L = async (s = {}, _) => {
    let g;
    if (_.startsWith("data:")) {
      const r = _.replace(/^data:.*?base64,/, "");
      let n;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") n = Buffer.from(r, "base64");
      else if (typeof atob == "function") {
        const o = atob(r);
        n = new Uint8Array(o.length);
        for (let a = 0; a < o.length; a++) n[a] = o.charCodeAt(a);
      } else throw new Error("Cannot decode base64-encoded data URL");
      g = await WebAssembly.instantiate(n, s);
    } else {
      const r = await fetch(_), n = r.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && n.startsWith("application/wasm")) g = await WebAssembly.instantiateStreaming(r, s);
      else {
        const o = await r.arrayBuffer();
        g = await WebAssembly.instantiate(o, s);
      }
    }
    return g.instance.exports;
  };
  y = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const g = Object.create(y.prototype);
      return g.__wbg_ptr = _, T.register(g, g.__wbg_ptr, g), g;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, T.unregister(this), _;
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
      let _, g;
      try {
        const r = e.__wbg_get_gamesettings_lobby_name(this.__wbg_ptr);
        return _ = r[0], g = r[1], l(r[0], r[1]);
      } finally {
        e.__wbindgen_free(_, g, 1);
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
      let _, g;
      try {
        const r = e.__wbg_get_gamesettings_modded_dataset(this.__wbg_ptr);
        return _ = r[0], g = r[1], l(r[0], r[1]);
      } finally {
        e.__wbindgen_free(_, g, 1);
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
      var g = U(_[0], _[1]).slice();
      return e.__wbindgen_free(_[0], _[1] * 4, 4), g;
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
      const g = d(_, e.__wbindgen_malloc, e.__wbindgen_realloc), r = i;
      e.__wbg_set_gamesettings_lobby_name(this.__wbg_ptr, g, r);
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
      const g = d(_, e.__wbindgen_malloc, e.__wbindgen_realloc), r = i;
      e.__wbg_set_gamesettings_modded_dataset(this.__wbg_ptr, g, r);
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
      const g = O(_, e.__wbindgen_malloc), r = i;
      e.__wbg_set_gamesettings_rms_strings(this.__wbg_ptr, g, r);
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
  Symbol.dispose && (y.prototype[Symbol.dispose] = y.prototype.free);
  m = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const g = Object.create(m.prototype);
      return g.__wbg_ptr = _, W.register(g, g.__wbg_ptr, g), g;
    }
    static __unwrap(_) {
      return _ instanceof m ? _.__destroy_into_raw() : 0;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, W.unregister(this), _;
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
      var g = o_(_[0], _[1]).slice();
      return e.__wbindgen_free(_[0], _[1] * 4, 4), g;
    }
    get name() {
      let _, g;
      try {
        const r = e.__wbg_get_player_name(this.__wbg_ptr);
        return _ = r[0], g = r[1], l(r[0], r[1]);
      } finally {
        e.__wbindgen_free(_, g, 1);
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
      const g = m_(_, e.__wbindgen_malloc), r = i;
      e.__wbg_set_player_custom_civ_ids(this.__wbg_ptr, g, r);
    }
    set name(_) {
      const g = d(_, e.__wbindgen_malloc, e.__wbindgen_realloc), r = i;
      e.__wbg_set_player_name(this.__wbg_ptr, g, r);
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
  Symbol.dispose && (m.prototype[Symbol.dispose] = m.prototype.free);
  u = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const g = Object.create(u.prototype);
      return g.__wbg_ptr = _, E.register(g, g.__wbg_ptr, g), g;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, E.unregister(this), _;
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
  Symbol.dispose && (u.prototype[Symbol.dispose] = u.prototype.free);
  h = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const g = Object.create(h.prototype);
      return g.__wbg_ptr = _, M.register(g, g.__wbg_ptr, g), g;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, M.unregister(this), _;
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
      return y.__wrap(_);
    }
    get game_string() {
      let _, g;
      try {
        const r = e.__wbg_get_savegameheader_game_string(this.__wbg_ptr);
        return _ = r[0], g = r[1], l(r[0], r[1]);
      } finally {
        e.__wbindgen_free(_, g, 1);
      }
    }
    get replay() {
      const _ = e.__wbg_get_savegameheader_replay(this.__wbg_ptr);
      return u.__wrap(_);
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
      F(_, y);
      var g = _.__destroy_into_raw();
      e.__wbg_set_savegameheader_game_settings(this.__wbg_ptr, g);
    }
    set game_string(_) {
      const g = d(_, e.__wbindgen_malloc, e.__wbindgen_realloc), r = i;
      e.__wbg_set_player_name(this.__wbg_ptr, g, r);
    }
    set replay(_) {
      F(_, u);
      var g = _.__destroy_into_raw();
      e.__wbg_set_savegameheader_replay(this.__wbg_ptr, g);
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
  Symbol.dispose && (h.prototype[Symbol.dispose] = h.prototype.free);
  x = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const g = Object.create(x.prototype);
      return g.__wbg_ptr = _, I.register(g, g.__wbg_ptr, g), g;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, I.unregister(this), _;
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
      return h.__wrap(_);
    }
    get teams() {
      const _ = e.__wbg_get_savegamesummary_teams(this.__wbg_ptr);
      var g = U(_[0], _[1]).slice();
      return e.__wbindgen_free(_[0], _[1] * 4, 4), g;
    }
    set duration(_) {
      e.__wbg_set_savegamesummary_duration(this.__wbg_ptr, _);
    }
    set header(_) {
      F(_, h);
      var g = _.__destroy_into_raw();
      e.__wbg_set_savegamesummary_header(this.__wbg_ptr, g);
    }
    set teams(_) {
      const g = O(_, e.__wbindgen_malloc), r = i;
      e.__wbg_set_savegamesummary_teams(this.__wbg_ptr, g, r);
    }
  };
  Symbol.dispose && (x.prototype[Symbol.dispose] = x.prototype.free);
  c = class {
    static __wrap(_) {
      _ = _ >>> 0;
      const g = Object.create(c.prototype);
      return g.__wbg_ptr = _, $.register(g, g.__wbg_ptr, g), g;
    }
    static __unwrap(_) {
      return _ instanceof c ? _.__destroy_into_raw() : 0;
    }
    __destroy_into_raw() {
      const _ = this.__wbg_ptr;
      return this.__wbg_ptr = 0, $.unregister(this), _;
    }
    free() {
      const _ = this.__destroy_into_raw();
      e.__wbg_team_free(_, 0);
    }
    get players() {
      const _ = e.__wbg_get_team_players(this.__wbg_ptr);
      var g = U(_[0], _[1]).slice();
      return e.__wbindgen_free(_[0], _[1] * 4, 4), g;
    }
    get winner() {
      return e.__wbg_get_team_winner(this.__wbg_ptr) !== 0;
    }
    set players(_) {
      const g = O(_, e.__wbindgen_malloc), r = i;
      e.__wbg_set_team_players(this.__wbg_ptr, g, r);
    }
    set winner(_) {
      e.__wbg_set_team_winner(this.__wbg_ptr, _);
    }
  };
  Symbol.dispose && (c.prototype[Symbol.dispose] = c.prototype.free);
  Us = function(s) {
    return e.parse_rec(s);
  };
  Os = function(s) {
    const _ = e.parse_rec_summary(s);
    return x.__wrap(_);
  };
  function N(s, _) {
    const g = R(_), r = d(g, e.__wbindgen_malloc, e.__wbindgen_realloc), n = i;
    w().setInt32(s + 4, n, true), w().setInt32(s + 0, r, true);
  }
  function V(s, _) {
    const g = _, r = typeof g == "string" ? g : void 0;
    var n = w_(r) ? 0 : d(r, e.__wbindgen_malloc, e.__wbindgen_realloc), o = i;
    w().setInt32(s + 4, o, true), w().setInt32(s + 0, n, true);
  }
  function J(s, _) {
    throw new Error(l(s, _));
  }
  function H(s, _) {
    let g, r;
    try {
      g = s, r = _, console.error(l(s, _));
    } finally {
      e.__wbindgen_free(g, r, 1);
    }
  }
  function Y(s) {
    return s.length;
  }
  function q() {
    return new Object();
  }
  function G() {
    return new Array();
  }
  function P() {
    return new Error();
  }
  function X(s) {
    return new Uint8Array(s);
  }
  function Z(s) {
    return m.__wrap(s);
  }
  function K(s) {
    return m.__unwrap(s);
  }
  function Q(s, _, g) {
    Uint8Array.prototype.set.call(b_(s, _), g);
  }
  function __(s, _, g) {
    s[_] = g;
  }
  function e_(s, _, g) {
    s[_ >>> 0] = g;
  }
  function t_(s, _) {
    const g = _.stack, r = d(g, e.__wbindgen_malloc, e.__wbindgen_realloc), n = i;
    w().setInt32(s + 4, n, true), w().setInt32(s + 0, r, true);
  }
  function s_(s) {
    return c.__wrap(s);
  }
  function g_(s) {
    return c.__unwrap(s);
  }
  function r_(s) {
    return s;
  }
  function n_(s, _) {
    return l(s, _);
  }
  function a_() {
    const s = e.__wbindgen_externrefs, _ = s.grow(4);
    s.set(0, void 0), s.set(_ + 0, void 0), s.set(_ + 1, null), s.set(_ + 2, true), s.set(_ + 3, false);
  }
  const T = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => e.__wbg_gamesettings_free(s >>> 0, 1)), W = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => e.__wbg_player_free(s >>> 0, 1)), E = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => e.__wbg_replay_free(s >>> 0, 1)), M = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => e.__wbg_savegameheader_free(s >>> 0, 1)), I = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => e.__wbg_savegamesummary_free(s >>> 0, 1)), $ = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((s) => e.__wbg_team_free(s >>> 0, 1));
  function i_(s) {
    const _ = e.__externref_table_alloc();
    return e.__wbindgen_externrefs.set(_, s), _;
  }
  function F(s, _) {
    if (!(s instanceof _)) throw new Error(`expected instance of ${_.name}`);
  }
  function R(s) {
    const _ = typeof s;
    if (_ == "number" || _ == "boolean" || s == null) return `${s}`;
    if (_ == "string") return `"${s}"`;
    if (_ == "symbol") {
      const n = s.description;
      return n == null ? "Symbol" : `Symbol(${n})`;
    }
    if (_ == "function") {
      const n = s.name;
      return typeof n == "string" && n.length > 0 ? `Function(${n})` : "Function";
    }
    if (Array.isArray(s)) {
      const n = s.length;
      let o = "[";
      n > 0 && (o += R(s[0]));
      for (let a = 1; a < n; a++) o += ", " + R(s[a]);
      return o += "]", o;
    }
    const g = /\[object ([^\]]+)\]/.exec(toString.call(s));
    let r;
    if (g && g.length > 1) r = g[1];
    else return toString.call(s);
    if (r == "Object") try {
      return "Object(" + JSON.stringify(s) + ")";
    } catch {
      return "Object";
    }
    return s instanceof Error ? `${s.name}: ${s.message}
${s.stack}` : r;
  }
  function U(s, _) {
    s = s >>> 0;
    const g = w(), r = [];
    for (let n = s; n < s + 4 * _; n += 4) r.push(e.__wbindgen_externrefs.get(g.getUint32(n, true)));
    return e.__externref_drop_slice(s, _), r;
  }
  function o_(s, _) {
    return s = s >>> 0, D().subarray(s / 4, s / 4 + _);
  }
  function b_(s, _) {
    return s = s >>> 0, v().subarray(s / 1, s / 1 + _);
  }
  let p = null;
  function w() {
    return (p === null || p.buffer.detached === true || p.buffer.detached === void 0 && p.buffer !== e.memory.buffer) && (p = new DataView(e.memory.buffer)), p;
  }
  function l(s, _) {
    return s = s >>> 0, l_(s, _);
  }
  let S = null;
  function D() {
    return (S === null || S.byteLength === 0) && (S = new Uint32Array(e.memory.buffer)), S;
  }
  let j = null;
  function v() {
    return (j === null || j.byteLength === 0) && (j = new Uint8Array(e.memory.buffer)), j;
  }
  function w_(s) {
    return s == null;
  }
  function m_(s, _) {
    const g = _(s.length * 4, 4) >>> 0;
    return D().set(s, g / 4), i = s.length, g;
  }
  function O(s, _) {
    const g = _(s.length * 4, 4) >>> 0;
    for (let r = 0; r < s.length; r++) {
      const n = i_(s[r]);
      w().setUint32(g + 4 * r, n, true);
    }
    return i = s.length, g;
  }
  function d(s, _, g) {
    if (g === void 0) {
      const b = k.encode(s), f = _(b.length, 1) >>> 0;
      return v().subarray(f, f + b.length).set(b), i = b.length, f;
    }
    let r = s.length, n = _(r, 1) >>> 0;
    const o = v();
    let a = 0;
    for (; a < r; a++) {
      const b = s.charCodeAt(a);
      if (b > 127) break;
      o[n + a] = b;
    }
    if (a !== r) {
      a !== 0 && (s = s.slice(a)), n = g(n, r, r = a + s.length * 3, 1) >>> 0;
      const b = v().subarray(n + a, n + r), f = k.encodeInto(s, b);
      a += f.written, n = g(n, r, a, 1) >>> 0;
    }
    return i = a, n;
  }
  let z = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  z.decode();
  const c_ = 2146435072;
  let A = 0;
  function l_(s, _) {
    return A += _, A >= c_ && (z = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), z.decode(), A = _), z.decode(v().subarray(s, s + _));
  }
  const k = new TextEncoder();
  "encodeInto" in k || (k.encodeInto = function(s, _) {
    const g = k.encode(s);
    return _.set(g), {
      read: s.length,
      written: g.length
    };
  });
  let i = 0, e;
  function d_(s) {
    e = s;
  }
  URL = globalThis.URL;
  const t = await L({
    "./aoe2rec_js_bg.js": {
      __wbg_team_unwrap: g_,
      __wbg_player_unwrap: K,
      __wbg_team_new: s_,
      __wbg_player_new: Z,
      __wbg_set_3f1d0b984ed272ed: __,
      __wbg_new_8a6f238a6ece86ea: P,
      __wbg_stack_0ed75d68575b0f3c: t_,
      __wbg_error_7534b8e9a36f1ab4: H,
      __wbg_new_3eb36ae241fe6f44: G,
      __wbg_new_361308b2356cecd0: q,
      __wbg_new_dd2b680c8bf6ae29: X,
      __wbg_length_32ed9a279acd054c: Y,
      __wbg_prototypesetcall_bdcdcc5842e4d77d: Q,
      __wbg_set_f43e577aea94465b: e_,
      __wbg___wbindgen_throw_be289d5034ed271b: J,
      __wbg___wbindgen_string_get_72fb696202c56729: V,
      __wbg___wbindgen_debug_string_0bc8482c6e3508ae: N,
      __wbindgen_init_externref_table: a_,
      __wbindgen_cast_0000000000000001: r_,
      __wbindgen_cast_0000000000000002: n_
    }
  }, C), p_ = t.memory, y_ = t.__wbg_gamesettings_free, u_ = t.__wbg_get_gamesettings_all_techs, h_ = t.__wbg_get_gamesettings_allow_specs, f_ = t.__wbg_get_gamesettings_battle_royale_time, v_ = t.__wbg_get_gamesettings_cheats, k_ = t.__wbg_get_gamesettings_difficulty, x_ = t.__wbg_get_gamesettings_ending_age_id, S_ = t.__wbg_get_gamesettings_fog_of_war, j_ = t.__wbg_get_gamesettings_game_type, z_ = t.__wbg_get_gamesettings_handicap, A_ = t.__wbg_get_gamesettings_hidden_civs, F_ = t.__wbg_get_gamesettings_lobby_name, R_ = t.__wbg_get_gamesettings_lobby_visibility, U_ = t.__wbg_get_gamesettings_lock_speed, O_ = t.__wbg_get_gamesettings_lock_teams, T_ = t.__wbg_get_gamesettings_map_size, W_ = t.__wbg_get_gamesettings_matchmaking, E_ = t.__wbg_get_gamesettings_modded_dataset, M_ = t.__wbg_get_gamesettings_multiplayer, I_ = t.__wbg_get_gamesettings_n_players, $_ = t.__wbg_get_gamesettings_num_starting_units, D_ = t.__wbg_get_gamesettings_population_limit, B_ = t.__wbg_get_gamesettings_random_positions, C_ = t.__wbg_get_gamesettings_ranked, L_ = t.__wbg_get_gamesettings_record_game, N_ = t.__wbg_get_gamesettings_resolved_map_id, V_ = t.__wbg_get_gamesettings_reveal_map, J_ = t.__wbg_get_gamesettings_rms_strings, H_ = t.__wbg_get_gamesettings_scenario_civ, Y_ = t.__wbg_get_gamesettings_selected_map_id, q_ = t.__wbg_get_gamesettings_shared_exploration, G_ = t.__wbg_get_gamesettings_spec_delay, P_ = t.__wbg_get_gamesettings_speed, X_ = t.__wbg_get_gamesettings_starting_age_id, Z_ = t.__wbg_get_gamesettings_starting_resources_id, K_ = t.__wbg_get_gamesettings_sub_game_mode, Q_ = t.__wbg_get_gamesettings_team_bonus_disabled, _e = t.__wbg_get_gamesettings_team_positions, ee = t.__wbg_get_gamesettings_trade_enabled, te = t.__wbg_get_gamesettings_treaty_length, se = t.__wbg_get_gamesettings_victory_amount, ge = t.__wbg_get_gamesettings_victory_type_id, re = t.__wbg_get_player_civ_id, ne = t.__wbg_get_player_color_id, ae = t.__wbg_get_player_custom_civ_ids, ie = t.__wbg_get_player_name, oe = t.__wbg_get_player_player_number, be = t.__wbg_get_player_player_type, we = t.__wbg_get_player_prefer_random, me = t.__wbg_get_player_resigned, ce = t.__wbg_get_player_resolved_team_id, le = t.__wbg_get_player_selected_color, de = t.__wbg_get_player_selected_team_id, pe = t.__wbg_get_replay_cheats_enabled, ye = t.__wbg_get_replay_game_mode, ue = t.__wbg_get_replay_game_speed, he = t.__wbg_get_replay_game_speed_id, fe = t.__wbg_get_replay_instant_build, ve = t.__wbg_get_replay_num_players, ke = t.__wbg_get_replay_old_time, xe = t.__wbg_get_replay_old_world_time, Se = t.__wbg_get_replay_rec_player, je = t.__wbg_get_replay_temp_pause, ze = t.__wbg_get_replay_timer, Ae = t.__wbg_get_replay_world_time, Fe = t.__wbg_get_replay_world_time_delta_seconds, Re = t.__wbg_get_savegameheader_build, Ue = t.__wbg_get_savegameheader_game_settings, Oe = t.__wbg_get_savegameheader_replay, Te = t.__wbg_get_savegameheader_timestamp, We = t.__wbg_get_savegameheader_version_major, Ee = t.__wbg_get_savegameheader_version_minor, Me = t.__wbg_get_savegamesummary_duration, Ie = t.__wbg_get_savegamesummary_header, $e = t.__wbg_get_savegamesummary_teams, De = t.__wbg_get_team_players, Be = t.__wbg_get_team_winner, Ce = t.__wbg_player_free, Le = t.__wbg_replay_free, Ne = t.__wbg_savegameheader_free, Ve = t.__wbg_savegamesummary_free, Je = t.__wbg_set_gamesettings_all_techs, He = t.__wbg_set_gamesettings_allow_specs, Ye = t.__wbg_set_gamesettings_battle_royale_time, qe = t.__wbg_set_gamesettings_cheats, Ge = t.__wbg_set_gamesettings_difficulty, Pe = t.__wbg_set_gamesettings_ending_age_id, Xe = t.__wbg_set_gamesettings_fog_of_war, Ze = t.__wbg_set_gamesettings_game_type, Ke = t.__wbg_set_gamesettings_handicap, Qe = t.__wbg_set_gamesettings_hidden_civs, _t = t.__wbg_set_gamesettings_lobby_name, et = t.__wbg_set_gamesettings_lobby_visibility, tt = t.__wbg_set_gamesettings_lock_speed, st = t.__wbg_set_gamesettings_lock_teams, gt = t.__wbg_set_gamesettings_map_size, rt = t.__wbg_set_gamesettings_matchmaking, nt = t.__wbg_set_gamesettings_modded_dataset, at = t.__wbg_set_gamesettings_multiplayer, it = t.__wbg_set_gamesettings_n_players, ot = t.__wbg_set_gamesettings_num_starting_units, bt = t.__wbg_set_gamesettings_population_limit, wt = t.__wbg_set_gamesettings_random_positions, mt = t.__wbg_set_gamesettings_ranked, ct = t.__wbg_set_gamesettings_record_game, lt = t.__wbg_set_gamesettings_resolved_map_id, dt = t.__wbg_set_gamesettings_reveal_map, pt = t.__wbg_set_gamesettings_rms_strings, yt = t.__wbg_set_gamesettings_scenario_civ, ut = t.__wbg_set_gamesettings_selected_map_id, ht = t.__wbg_set_gamesettings_shared_exploration, ft = t.__wbg_set_gamesettings_spec_delay, vt = t.__wbg_set_gamesettings_speed, kt = t.__wbg_set_gamesettings_starting_age_id, xt = t.__wbg_set_gamesettings_starting_resources_id, St = t.__wbg_set_gamesettings_sub_game_mode, jt = t.__wbg_set_gamesettings_team_bonus_disabled, zt = t.__wbg_set_gamesettings_team_positions, At = t.__wbg_set_gamesettings_trade_enabled, Ft = t.__wbg_set_gamesettings_treaty_length, Rt = t.__wbg_set_gamesettings_victory_amount, Ut = t.__wbg_set_gamesettings_victory_type_id, Ot = t.__wbg_set_player_civ_id, Tt = t.__wbg_set_player_color_id, Wt = t.__wbg_set_player_custom_civ_ids, Et = t.__wbg_set_player_name, Mt = t.__wbg_set_player_player_type, It = t.__wbg_set_player_prefer_random, $t = t.__wbg_set_player_resigned, Dt = t.__wbg_set_player_resolved_team_id, Bt = t.__wbg_set_player_selected_color, Ct = t.__wbg_set_player_selected_team_id, Lt = t.__wbg_set_replay_cheats_enabled, Nt = t.__wbg_set_replay_game_mode, Vt = t.__wbg_set_replay_game_speed, Jt = t.__wbg_set_replay_game_speed_id, Ht = t.__wbg_set_replay_instant_build, Yt = t.__wbg_set_replay_num_players, qt = t.__wbg_set_replay_old_time, Gt = t.__wbg_set_replay_old_world_time, Pt = t.__wbg_set_replay_rec_player, Xt = t.__wbg_set_replay_temp_pause, Zt = t.__wbg_set_replay_timer, Kt = t.__wbg_set_replay_world_time, Qt = t.__wbg_set_replay_world_time_delta_seconds, _s = t.__wbg_set_savegameheader_build, es = t.__wbg_set_savegameheader_game_settings, ts = t.__wbg_set_savegameheader_replay, ss = t.__wbg_set_savegameheader_timestamp, gs = t.__wbg_set_savegameheader_version_major, rs = t.__wbg_set_savegameheader_version_minor, ns = t.__wbg_set_savegamesummary_duration, as = t.__wbg_set_savegamesummary_header, is = t.__wbg_set_savegamesummary_teams, os = t.__wbg_set_team_players, bs = t.__wbg_set_team_winner, ws = t.__wbg_team_free, ms = t.parse_rec, cs = t.parse_rec_summary, ls = t.__wbg_set_savegameheader_game_string, ds = t.__wbg_set_player_player_number, ps = t.__wbg_set_player_profile_id, ys = t.__wbg_set_replay_random_seed, us = t.__wbg_set_replay_random_seed_2, hs = t.__wbg_get_replay_random_seed, fs = t.__wbg_get_replay_random_seed_2, vs = t.__wbg_get_player_profile_id, ks = t.__wbg_get_savegameheader_game_string, xs = t.__wbindgen_malloc, Ss = t.__wbindgen_realloc, js = t.__wbindgen_free, zs = t.__wbindgen_externrefs, As = t.__externref_drop_slice, Fs = t.__externref_table_alloc, B = t.__wbindgen_start, Rs = Object.freeze(Object.defineProperty({
    __proto__: null,
    __externref_drop_slice: As,
    __externref_table_alloc: Fs,
    __wbg_gamesettings_free: y_,
    __wbg_get_gamesettings_all_techs: u_,
    __wbg_get_gamesettings_allow_specs: h_,
    __wbg_get_gamesettings_battle_royale_time: f_,
    __wbg_get_gamesettings_cheats: v_,
    __wbg_get_gamesettings_difficulty: k_,
    __wbg_get_gamesettings_ending_age_id: x_,
    __wbg_get_gamesettings_fog_of_war: S_,
    __wbg_get_gamesettings_game_type: j_,
    __wbg_get_gamesettings_handicap: z_,
    __wbg_get_gamesettings_hidden_civs: A_,
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
    __wbg_get_gamesettings_victory_type_id: ge,
    __wbg_get_player_civ_id: re,
    __wbg_get_player_color_id: ne,
    __wbg_get_player_custom_civ_ids: ae,
    __wbg_get_player_name: ie,
    __wbg_get_player_player_number: oe,
    __wbg_get_player_player_type: be,
    __wbg_get_player_prefer_random: we,
    __wbg_get_player_profile_id: vs,
    __wbg_get_player_resigned: me,
    __wbg_get_player_resolved_team_id: ce,
    __wbg_get_player_selected_color: le,
    __wbg_get_player_selected_team_id: de,
    __wbg_get_replay_cheats_enabled: pe,
    __wbg_get_replay_game_mode: ye,
    __wbg_get_replay_game_speed: ue,
    __wbg_get_replay_game_speed_id: he,
    __wbg_get_replay_instant_build: fe,
    __wbg_get_replay_num_players: ve,
    __wbg_get_replay_old_time: ke,
    __wbg_get_replay_old_world_time: xe,
    __wbg_get_replay_random_seed: hs,
    __wbg_get_replay_random_seed_2: fs,
    __wbg_get_replay_rec_player: Se,
    __wbg_get_replay_temp_pause: je,
    __wbg_get_replay_timer: ze,
    __wbg_get_replay_world_time: Ae,
    __wbg_get_replay_world_time_delta_seconds: Fe,
    __wbg_get_savegameheader_build: Re,
    __wbg_get_savegameheader_game_settings: Ue,
    __wbg_get_savegameheader_game_string: ks,
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
    __wbg_set_gamesettings_map_size: gt,
    __wbg_set_gamesettings_matchmaking: rt,
    __wbg_set_gamesettings_modded_dataset: nt,
    __wbg_set_gamesettings_multiplayer: at,
    __wbg_set_gamesettings_n_players: it,
    __wbg_set_gamesettings_num_starting_units: ot,
    __wbg_set_gamesettings_population_limit: bt,
    __wbg_set_gamesettings_random_positions: wt,
    __wbg_set_gamesettings_ranked: mt,
    __wbg_set_gamesettings_record_game: ct,
    __wbg_set_gamesettings_resolved_map_id: lt,
    __wbg_set_gamesettings_reveal_map: dt,
    __wbg_set_gamesettings_rms_strings: pt,
    __wbg_set_gamesettings_scenario_civ: yt,
    __wbg_set_gamesettings_selected_map_id: ut,
    __wbg_set_gamesettings_shared_exploration: ht,
    __wbg_set_gamesettings_spec_delay: ft,
    __wbg_set_gamesettings_speed: vt,
    __wbg_set_gamesettings_starting_age_id: kt,
    __wbg_set_gamesettings_starting_resources_id: xt,
    __wbg_set_gamesettings_sub_game_mode: St,
    __wbg_set_gamesettings_team_bonus_disabled: jt,
    __wbg_set_gamesettings_team_positions: zt,
    __wbg_set_gamesettings_trade_enabled: At,
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
    __wbg_set_player_profile_id: ps,
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
    __wbg_set_savegameheader_version_major: gs,
    __wbg_set_savegameheader_version_minor: rs,
    __wbg_set_savegamesummary_duration: ns,
    __wbg_set_savegamesummary_header: as,
    __wbg_set_savegamesummary_teams: is,
    __wbg_set_team_players: os,
    __wbg_set_team_winner: bs,
    __wbg_team_free: ws,
    __wbindgen_externrefs: zs,
    __wbindgen_free: js,
    __wbindgen_malloc: xs,
    __wbindgen_realloc: Ss,
    __wbindgen_start: B,
    memory: p_,
    parse_rec: ms,
    parse_rec_summary: cs
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  d_(Rs);
  B();
})();
export {
  y as GameSettings,
  m as Player,
  u as Replay,
  h as SavegameHeader,
  x as SavegameSummary,
  c as Team,
  __tla,
  Us as parse_rec,
  Os as parse_rec_summary
};
