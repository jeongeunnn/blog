/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  //let post = '강남 우동 맛집';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동맛짐', '파이썬 독학']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false); //작명시 set붙여서 쓰는 것이 관습적인 것
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  //map
  //1.array자료 갯수만큼 함수안의 코드 실행해줌
  //2.함수의 파라미터는 array안에 있던 자료
  //3.return에 뭐 적으면 array로 담아줌
  [1,2,3].map(function(a){
    return '123123'
  })


  return (
    <div className="App">
      <div className="black-nav">
        <h4>블로그임</h4>
      </div>

      {/* <div className="list">
        <h4>{ 글제목[0] } <span onClick={ () => { 따봉변경(따봉+1) } }>👍</span> { 따봉 } </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      
      <div className="list">
        <h4 onClick={ () => { 
          setModal(!modal) 
        }}>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}

      <button 
        type="button" 
        onClick={ () => {
          let change = [...글제목];
              change.sort(); //toUpperCase 대문자로 변환
          글제목변경(change);
      } }>가나다순정렬</button>
      <button 
        type="button" 
        onClick={ () => {
          //첫번째 방법
          //글제목변경(['여자 코트 추천', '강남 우동맛짐', '파이썬 독학'])
          //=> 확장성이 없는 방법, 비효율적임
          //두번째 방법(안됨)
          //글제목[0] = '여자 코트 추천';
          //글제목변경(글제목) //원본 데이터 수정
          //세번째 방법
          let copy = [...글제목]; //원본 데이터 보존하는 방식(deep copy)
              //...괄호를 벗겨주세요/[]괄호를 다시 씌워주세요
              copy[0] = '여자 코트 추천';
          글제목변경(copy);
          //state변경함수의 특징
          /* => 기존 state == 신규state를 등호로 비교해서
          같으면 변경하지 않음
          => 첫번째 방법의 경우 가르키는 
          화살표는 똑같으므로 변경되지 않음 */
          //array/object 특징
          /* => array/object는 담은 변수엔 
          RAM이 가지고 있는 데이터를 가리키는 화살표만 저장됨 */
      } }>수정버튼</button>

      {
        
        // for문 대신 map
        //[1,2,3].map(function(){
        글제목.map(function(a, i){ //a : array안에 있던 데이터 / i : 반복문이 돌 때마다 0부터 1씩 증가하는 정수
          //return <div>안녕</div> // => ['<div>안녕</div>', '<div>안녕</div>', '<div>안녕</div>']
          let now = new Date();
          let month = now.getMonth() + 1;
          let day = now.getDate();
          return (
            <div className="list" key={i}>
              <h4 onClick={ () => {
                setModal(!modal) 
                setTitle(i)
              } }>
                { a }
                <span onClick={ (e) => { 
                  e.stopPropagation();
                  //상위html로 퍼지는 이벤트 버블링을 막고싶을때 사용
                  let count = [...따봉];
                      count[i] = count[i] + 1;
                  따봉변경(count);
                  } }>👍</span> { 따봉[i] }
              </h4>
              <p>{ month }월 {day}일 발행</p>
              <button type="button" onClick={ () => {
                let del = [...글제목];
                    del.splice(i, 1);
                글제목변경(del);
              } }>삭제</button>
            </div>
          )
        })
      }

      <input onChange={ (e) => {
        입력값변경(e.target.value); // 늦게처리됨(비동기처리)
        //console.log(입력값);
      } }/>
      <button type="button" onClick={ () => {
        let add = [...글제목];
            add.unshift(입력값);
        let like = [...따봉];
            like.unshift(0);
        if(입력값 !== ''){
          글제목변경(add);
          따봉변경(like);
        }else{
          alert('내용을 입력해주세요.');
        }
      } }>글발행</button>
      
      {
        modal == true ? <Modal 글제목={ 글제목 } 글제목변경={ 글제목변경 } title={ title } /> : null
      }
      
      {/* <Title/> */}
      <Modal2></Modal2>

      
    </div>
  );
}

// 다른 function 바깥에 만들어주기
// 첫글자 대문자
// return 소괄호 안에는 하나의 태그로 시작해서 하나의 태그로 끝나야 한다
/* const Title = () => {
  return (
    <h1>아무이름</h1>
  )
} */

function Modal(props) {
  return (
    <div className="modal">
      <h4>{ props.글제목[props.title] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={ () => {
        let copy = [...props.글제목];
            copy[props.title] = '여자 코트 추천';
        props.글제목변경(copy);
      }
      }>글수정</button>
    </div>
  )
}

//class(변수/함수 보관)를 이용한 옛날 React문법
class Modal2 extends React.Component{
  //constructor, super, render 채워넣어야함
  constructor(props){
    super(props);
    this.state = {
      name: 'Kim',
      age: 20
    }
  }
  render(){
    console.log(this.props.name);
    return(
      <div>안녕
        {this.state.name} {this.state.age} 
        <button onClick={() => {
          this.setState({age: 30}) 
          // 기존 state만 갈아치워주는게 아니라 변경사항만 바꿔줌
          // (차이점 분석해서 차이점만 붙여넣어줌)
        }}>버튼</button>
      </div>
    )
  }
}

export default App;
