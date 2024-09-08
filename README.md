Todo/Calendar App
1. 앱 설명
Calendar 앱
이 프로젝트는 일정(Calendar) 관리 앱으로, 사용자는 이벤트를 생성, 수정, 삭제할 수 있습니다. 또한 일정에 대한 공유 기능을 제공하며, 이벤트가 공유된 사용자에게 표시됩니다. 이 앱은 React.js v18과 Ant Design v4를 사용하여 개발되었으며, FullCalendar 라이브러리를 활용해 달력 UI를 구현했습니다.

주요 기능
일정 추가: 날짜를 클릭해 이벤트를 생성할 수 있습니다.
일정 수정: 기존 이벤트를 클릭해 내용을 수정할 수 있습니다.
일정 삭제: 일정 삭제 버튼을 통해 이벤트를 삭제할 수 있습니다.
일정 공유: 선택한 사용자와 이벤트를 공유할 수 있으며, 공유된 이벤트는 해당 사용자에게 표시됩니다.
서버 연결: 일정 데이터는 서버에서 가져오거나, 서버 연결 실패 시 더미 데이터를 사용해 동작합니다.
2. 소스 빌드 및 실행 방법
설치 및 실행
1.레포지토리를 클론합니다.

```
git clone [<레포지토리 URL>](https://github.com/junhyeong9812/clush_front)
cd <프로젝트 디렉토리>
```
2.패키지 설치

```
npm install
```
3.애플리케이션 실행


```
npm start
```
4.브라우저에서 http://localhost:3000으로 접속하여 앱을 사용합니다.


빌드
1.애플리케이션 빌드

```
npm run build
```

2.build 폴더의 파일을 배포합니다.

3. 사용한 주요 컴포넌트 설명
1. Ant Design Modal
사용 이유: 이벤트 생성 및 수정 시 모달 창을 통해 사용자가 데이터를 입력할 수 있도록 하였습니다. 직관적인 UI로 사용자 경험을 개선하고, 상태 관리를 쉽게 할 수 있는 구조로 구현되었습니다.
2. FullCalendar
사용 이유: 달력 UI를 쉽게 구현하고, 일정 데이터를 시각화하기 위해 사용했습니다. FullCalendar는 이벤트 추가, 수정, 삭제 등 달력에서 필요한 모든 기능을 제공하여 일정 관리 기능을 빠르게 개발할 수 있습니다.
3. Ant Design Form
사용 이유: 이벤트 생성 및 수정 폼을 관리하기 위해 사용했습니다. Form 컴포넌트는 유효성 검사와 사용자 입력 관리를 쉽게 할 수 있는 구조를 제공하여, 복잡한 상태 관리 없이도 일관된 사용자 경험을 제공합니다.
