/**
 * @link https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list?hl=ko
 */
export type CSEquery = {
  /**
   * 중국어 및 중국어 간체 검색을 사용 또는 사용 중지
   * 1: 사용 중지됨
   * 0: 사용 설정됨 (기본값)
   */
  c2coff?: string;

  /**
   * 검색결과를 특정 국가에서 생성된 문서로 제한합니다.
   */
  cr?: string;

  /**
   * 날짜를 기준으로 결과를 URL로 제한합니다
   * - d[number]: 지정된 일수 동안 결과를 요청합니다.
   * - w[number]: 지정된 수의 지난 주 결과를 요청합니다.
   * - m[number]: 지난 몇 개월 동안 지정된 수의 결과를 요청합니다.
   * - y[number]: 지난 몇 년 동안 지정된 결과를 요청합니다.
   */
  dateRestrict?: string;

  /**
   * 최종 사용자의 위치정보입니다.
   * - 대한민국: kr
   * @link https://developers.google.com/custom-search/docs/json_api_reference?hl=ko#countryCodes
   */
  gl?: string;

  /**
   * 사용자 인터페이스 언어
   * - 한국어: ko
   */
  hl?: string;

  /**
   * 검색 범위의 종료 값을 지정합니다
   */
  highRange?: string;

  /**
   * 검색 범위의 시작 값을 지정합니다. lowRange 및 highRange를 사용하여 lowRange...highRange의 포괄적 검색 범위를 쿼리에 추가합니다.
   */
  lowRange?: string;

  /**
   * 지정된 검색어를 논리적 AND 연산자와 결합한 것처럼 쿼리에 추가합니다.
   */
  hq?: string;

  imgColorType?: 'color' | 'gray' | 'mono' | 'trans';

  imgDominantColor?: 'black' | 'blue' | 'brown' | 'gray' | 'green' | 'orange' | 'pink' | 'purple' | 'red' | 'teal' | 'white' | 'yellow';

  imgType?: 'clipart' | 'face' | 'lineart' | 'stock' | 'photo' | 'animated';

  linkSite?: string;

  /**
   * 특정 언어
   * lang_ko: 한국어
   */
  lr?: string;

  /**
   * 반환할 검색결과 수입니다.
   * 유효한 값은 1에서 10 사이의 정수입니다.
   */
  num?: number;

  /**
   * 문서에서 검사할 추가 검색어를 제공합니다. 검색결과의 각 문서에는 하나 이상의 추가 검색어가 포함되어야 합니다.
   */
  orTerms?: string;

  /**
   * 모든 검색결과가 지정된 URL과 관련된 페이지여야 함을 지정합니다.
   */
  relatedSite?: string;

  /**
   * 라이선스를 기반으로 한 필터. 지원되는 값은 cc_publicdomain, cc_attribute, cc_sharealike, cc_noncommercial, cc_nonderived 및 이 둘의 조합
   */
  rights?: string;

  /**
   * 검색 보안 수준.
   * "active": 세이프서치 필터링을 사용 설정합니다.
   * "off": 세이프서치 필터링을 사용 중지합니다. (기본)
   */
  safe?: 'active' | 'off';

  /**
   * 검색 유형(image)을 지정합니다. 지정하지 않으면 검색결과가 웹페이지로 제한됩니다.
   */
  searchType?: 'image';

  /**
   * 항상 결과에 포함하거나 제외해야 하는 지정된 사이트를 지정합니다
   */
  siteSearch?: string;

  /**
   * siteSearch 매개변수에 명시된 사이트의 결과를 포함할지 또는 제외할지 여부를 제어합니다.
   * - "e": 제외
   * - "i": 포함
   */
  siteSearchFilter?: 'e' | 'i';

  /**
   * 반환할 첫 번째 결과의 색인입니다. 페이지당 기본 결과 수는 10개이므로 &start=11는 두 번째 결과 페이지 상단에서 시작합니다.
   */
  start?: number;

  /**
   * 결과에 적용할 정렬 표현식입니다. 정렬 매개변수는 결과를 지정된 표현식(즉, 날짜순 정렬)에 따라 정렬하도록 지정합니다. 예: align=date.
   */
  sort?: string;

  /**
   * 기타 쿼리값
   */
  [key: string]: string | number;
};
