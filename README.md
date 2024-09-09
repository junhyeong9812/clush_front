# 클러쉬 프론트엔드 (Clush Frontend)

이 프로젝트는 **React.js v18** 및 **Ant Design v4** 이상을 사용하여 개발된 할 일(ToDo) 및 일정(Calendar) 관리 애플리케이션입니다. Drag & Drop 기능과 일정 공유 기능을 포함하고 있으며, 사용자는 할 일 관리 및 일정 관리를 손쉽게 할 수 있습니다.

## 프로젝트 개요

### ToDo 애플리케이션
사용자는 할 일을 생성, 수정, 삭제할 수 있으며, 작업의 상태를 "To Do", "In Progress", "Completed"로 나누어 관리할 수 있습니다. Drag & Drop 기능을 통해 할 일의 상태를 변경할 수 있습니다. 

### Calendar 애플리케이션
사용자는 일정을 생성, 수정, 삭제할 수 있으며, 일정에 대해 다른 사용자와 공유할 수 있습니다. Calendar는 FullCalendar 라이브러리를 사용하여 월, 주, 일별로 일정을 관리할 수 있습니다.

## 주요 기능

### ToDo 기능
- **할 일 생성/수정/삭제**: 사용자는 할 일을 추가하고, Drag & Drop으로 상태를 변경하거나, 기존 할 일을 수정/삭제할 수 있습니다.
- **상태 관리**: 할 일의 상태는 "To Do", "In Progress", "Completed"로 나누어 관리됩니다.
- **Drag & Drop**: 할 일의 상태는 직관적으로 드래그 앤 드롭하여 변경할 수 있습니다.

### Calendar 기능
- **일정 생성/수정/삭제**: 사용자는 일정을 추가하고, 수정하거나 삭제할 수 있습니다.
- **일정 공유**: 사용자는 일정을 다른 사용자와 공유할 수 있으며, 공유된 일정은 빨간색으로 표시됩니다.
- **FullCalendar**: FullCalendar 라이브러리를 사용하여 일정을 월, 주, 일별로 관리할 수 있습니다.

## 사용된 주요 라이브러리

- **React.js**: UI를 구축하기 위해 사용.
- **Ant Design**: UI 컴포넌트 라이브러리로 사용자 경험을 개선.
- **@dnd-kit**: Drag & Drop 기능을 구현하기 위해 사용.
- **FullCalendar**: 일정 관리 및 시각화를 위한 캘린더 라이브러리.
- **Axios**: API 요청을 처리하기 위해 사용.

## 프로젝트 설치 및 실행 방법

1. **프로젝트 클론**
   ```
   git clone https://github.com/username/clush_frontend.git
   cd clush_frontend
   ```

2. **패키지 설치**
```
npm install
```
3. **프로젝트 실행**
```
npm start
```
4. **빌드**
```
npm run build
```

## 주요 컴포넌트 설명

### 1. TodoBoard
- 할 일 관리 보드로, 상태에 따라 "To Do", "In Progress", "Completed" 세 가지 컬럼으로 나뉩니다.
- Drag & Drop을 통해 할 일의 상태를 변경할 수 있으며, 대시보드 모드에서는 "In Progress" 상태만 표시됩니다.

### 2. Calendar
- FullCalendar 라이브러리를 사용하여 일정 관리를 구현했습니다.
- 일정을 다른 사용자와 공유할 수 있으며, 공유된 일정은 빨간색으로 표시됩니다.
- 일정의 시작일과 종료일을 선택할 수 있으며, 전체 일정으로 지정할 수 있는 기능도 포함되어 있습니다.

### 3. TaskEditModal
- 할 일 추가 및 수정을 위한 모달입니다. 사용자는 할 일의 제목, 상태, 설명 등을 입력할 수 있습니다.

### 4. CalendarModal
- 일정 추가 및 수정을 위한 모달입니다. 일정의 시작 시간과 종료 시간, 설명 등을 설정할 수 있으며, 일정을 다른 사용자와 공유할 수 있는 기능도 제공됩니다.

### 백엔드 Git주소 : https://github.com/junhyeong9812/clush_backEnd
