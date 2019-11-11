# FM.GG(15서렌)

## 개발 목표

- `Riot Games Api`를 통한 리그오브레전드 정보 사이트 만들기
- http://ec2-15-164-102-54.ap-northeast-2.compute.amazonaws.com

## Tech Stack

| Frontend | Backend | Database | Hosting |
|:--------:|:--------:|:-------:|:-------:|
| `React` | `Node.js` | | `AWS EC2`
| `Redux` | `Express.js` |  |
| `Redux-Saga` |  | |
|`React-Router`|
| `Styled-Components`|
| `Webpack`|
| `Babel`|

## 활용 가능한 데이터 `(API_KEY Required.)`

### `SUMMONER-V4`

> https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summonerName}

- 소환사 닉네임 - `name`
- 소환사 레벨 - `summonerLevel`
- 소환사 정보 갱신 시각 - `revisionDate`
- 암호화된 소환사 아이디 - `id`
- 암호화된 계정 아이디 - `accountId`

### `CHAMPION-MASTERY-V4`

> https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}

- 챔피언 아이디 - `championId`
- 챔피언 숙련도 레벨 - `championLevel`
- 챔피언 숙련도 점수 - `championPoints`
- 챔피언 남은 숙련도 점수 - `championPointsUntilNextLevel` (5레벨에 0 고정)
- 마지막 플레이 시각 - `lastPlayTime`
- 챔피언 레벨 토큰 개수 - `tokensEarned` (5레벨 이후를 위한 토큰)
- 마지막 챔피언 레벨 이후의 숙련도 점수 - `championPointsSinceLastLevel`
- 소환사 아이디 - `summonerId` (암호화)

### `CHAMPION-V3`

> https://kr.api.riotgames.com/lol/platform/v3/champion-rotations

- 금주의 무료 챔피언 - `freeChampionIds`
- 뉴비를 위한 무료 챔피언 - `freeChampionIdsForNewPlayers`

### `LEAGUE-V4`

> https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/{encryptedSummonerId}?api_key={api_key}

- 게임 종류 - `queueType`
- 소환사이름 - `summonerName`
- 승리 - `wins`
- 패배 - `losses`
- 티어 - `tier`
- 랭크 - `rank`
- 리그 점수 - `leaguePoints`

### `MATCH-V4`

> https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/{encryptedAccountId}&api_key={api_key}

- 라인 - `lane`
- 게임아이디 - `gameId`
- 챔피언 - `champion`
- 플랫폼아이디 - `platformId`
- 게임시각 - `timestamp`
- 게임타입 - `queue`
- 역할 - `role`
- 시즌 - `season`

## 개발 이미지

| HOME (개발완료) |
|:--------:|
|![FMGG_HOME](./DevImages/FMGG_HOME.gif)|

| SUMMONER LEAGUE (개발중) |
|:--------:|
|![SUMMONER_LEAGUE](./DevImages/FMGG_SUMMONER_LEAGUE.png)|

## 개발 히스토리

- 2019-11-07
  
  - URL 파라미터를 통한 접근도 가능하도록 설정
  
  - 승률 게이지는 양쪽에서 팽창하는 애니메이션 적용
    > Styled-Components를 통해서 작업을 하는데 드롭다운 리스트 변경을 함에도 불구하고 애니메이션이 새롭게 재적용 되지 않는 문제가 있었다. 컴포넌트에 `Key` 속성을 할당하면서 애니메이션이 재 적용되었음.
  - 상단 드롭다운을 통해 진행한 게임종류에 따른 리그정보 확인가능

- 2019-11-11

  - [`Kayn`](https://github.com/cnguy/kayn) 라이브러리 도입 결정

    - 요청 트래픽 자동 조정
  
    - 개발 코스트 최소화

  - 최근 게임 정보 호출을 통한 플레이 빈도가 높은 챔피언 확인
  
    - > 유저는 자신이 빈도높게 활용하는 챔피언을 통한 플레이가 어떻게 변화하고 있는지 확인하고 싶을 것.