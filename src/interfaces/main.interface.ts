export interface SportType {
  id: number;
  name: string;
  name_ru: string;
  name_en: string;
  counter: number;
  name_ko: string;
  name_fr: string;
  name_cn: string;
  name_tr: string;
}

export interface CountryType {
  id: number;
  name: string;
  name_ru: string;
  name_en: string;
  sport_id: number;
  counter: number;
}

export interface TournamentType {
  id: number;
  name: string;
  name_ru: string;
  name_en: string;
  sport_id: number;
  country_id: number;
  counter: number;
}

export interface EventType {
  uniq: string;
  chain_id: null;
  ext_game_id: number;
  game_id: number;
  game_mid: number;
  game_num: number;
  game_dop_name: string;
  game_start: number;
  game_oc_list: GameOcList[];
  game_oc_counter: number;
  tournament_id: number;
  tournament_name: string;
  tournament_name_ru: string;
  tournament_name_en: string;
  opp_1_name: string;
  opp_2_name: string;
  opp_1_name_ru: string;
  opp_2_name_ru: string;
  opp_1_name_en: string;
  opp_2_name_en: string;
  opp_1_id: number;
  opp_1_ids: number[];
  opp_2_id: number;
  opp_2_ids: number[];
  opp_1_icon: number;
  opp_2_icon: number;
  sport_name: string;
  sport_name_ru: string;
  sport_name_en: string;
  sport_id: number;
  score_full: string;
  score_extra: string;
  score_period: string;
  period_name: string;
  stat_list: any[];
  stat_list_extra: any[];
  timer: number;
  extra_time: string;
  pitch: null;
  game_plan: null;
  finale: boolean;
  game_desk: string;
}

export interface GameOcList {
  oc_group_name: string;
  oc_name: string;
  oc_rate: number;
  oc_pointer: string;
  oc_block: boolean;
}

export interface EventFullType {
  uniq: string;
  chain_id: null;
  ext_game_id: number;
  game_id: number;
  game_mid: number;
  game_num: number;
  game_dop_name: string;
  game_start: number;
  game_oc_list: OcList[];
  tournament_id: number;
  tournament_name: string;
  tournament_name_ru: string;
  tournament_name_en: string;
  opp_1_name: string;
  opp_2_name: string;
  opp_1_name_ru: string;
  opp_2_name_ru: string;
  opp_1_name_en: string;
  opp_2_name_en: string;
  opp_1_id: number;
  opp_1_ids: number[];
  opp_2_id: number;
  opp_2_ids: number[];
  opp_1_icon: number;
  opp_2_icon: number;
  sport_name: string;
  sport_name_ru: string;
  sport_name_en: string;
  sport_id: number;
  score_full: string;
  score_extra: string;
  score_period: string;
  period_name: string;
  stat_list: any[];
  stat_list_extra: StatListExtra[];
  timer: number;
  extra_time: string;
  pitch: null;
  game_plan: null;
  finale: boolean;
  game_desk: string;
  sub_games: SubGame[];
}

export interface OcList {
  oc_group_name: string;
  oc_name: string;
  oc_rate: number;
  oc_pointer: string;
  oc_block: boolean;
}

export interface StatListExtra {
  Key: string;
  Value: string;
}

export interface SubGame {
  game_id: number;
  game_num: number;
  game_name: string;
  oc_list: OcList[];
}
