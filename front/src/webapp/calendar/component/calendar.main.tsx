import React, { useCallback, useEffect, useState } from 'react';

export const CalendarMain = () => {
  // const DATE = new Date().toLocaleDateString('ko-KR');
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };
  const week: string[] = ['일', '월', '화', '수', '목', '금', '토']; //일주일
  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 해당년도와 해당달의 마지막 날짜

  const prevMonth = useCallback(() => {
    // 이전 달 보기 버튼
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  const nextMonth = useCallback(() => {
    // 다음 달 보기 버튼
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  const returnWeek = useCallback(() => {
    //요일 반환 함수

    return week.map((element: string, index: number) => {
      return (
        <div
          style={{
            float: 'left',
            fontSize: '20px',
            margin: '8px 13px',
            width: '25px',
            height: '25px',
            textAlign: 'center',
          }}
          key={index}
        >
          {element}
        </div>
      );
    });
  }, []);

  const selectedDay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const event = e.currentTarget.innerText;
    console.log(event);
    // const eventTarget = e.target as HTMLElement;
    // console.log(eventTarget.innerText);
  };

  const returnDay = useCallback(() => {
    //선택된 달의 날짜들 반환 함수
    let dayArr = [];

    for (const nowDay of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();

      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          dayArr.push(
            <div
              style={{
                float: 'left',
                fontSize: '20px',
                margin: '8px 13px',
                width: '25px',
                height: '25px',
                textAlign: 'center',
              }}
              key={i + 1}
              onClick={selectedDay}
            >
              {i + 1}
            </div>,
          );
        }
      } else {
        dayArr.push(
          <div
            style={{
              float: 'left',
              fontSize: '20px',
              margin: '8px 13px',
              width: '25px',
              height: '25px',
              textAlign: 'center',
            }}
          ></div>,
        );
      }
    }

    return dayArr;
  }, [selectedYear, selectedMonth, dateTotalCount]);

  return (
    <>
      <div>
        <header>
          <h2>Header</h2>
        </header>
        <div>
          <div
            style={{
              width: '370px',
              height: '730px',
              margin: 'auto',
              padding: '10px 10px',
              border: '1px solid rgba(128, 128, 128, 0.267)',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div>
              <h3>
                <button onClick={prevMonth}>◀︎</button>
                {selectedMonth}월 {selectedYear}년
                <button onClick={nextMonth}>▶︎</button>
              </h3>
            </div>

            <div>{returnWeek()}</div>
            <div>{returnDay()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

// https://eunhee-programming.tistory.com/267
