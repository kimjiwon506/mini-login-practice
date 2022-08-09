
미니 로그인 페이지 구현
-------------
자바스크립트로 작성한 로그인 페이지 입니다.

아이디와, 비밀번호, 비밀번호 확인이 focusout 되었을때 정규화 체크 후 맞지 않을경우 에러메시지가 나오도록
하였고, 입력 완료시 모달창에 입력값이 나오도록 하였습니다.

- 정규화 체크 후 값이 맞지 않을경우 해당 에러 키 도출
<pre><code>
const checkRegex = (target) => {
  const { value, id } = target;
  if(value.length === 0){
    return 'required';
  } else {
    switch(id){
      case 'id' : 
      return ID_REGEX.test(value) ? true : 'invalidId';
      case 'pw' :
        return PW_REGEX.test(value) ? true : 'invalidPw'
      case 'pw-check' :
        return value === $pw.value ? true : 'invalidPwCheck'
    }
  }
}
</code></pre>

<pre><code>
const formValidCheck = (target, targetMsg) => {
  const validCheck = checkRegex(target);
  if (validCheck !== true){
    target.classList.add('red');
    targetMsg.innerText = ERROR_MSG[validCheck];
  } else {
      target.classList.remove('red');
      targetMsg.innerText = '';
  }
  return validCheck;
}

</code></pre>
