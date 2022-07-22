const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')

// 정규화 체크하기
const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

// 에러메세지
const ERROR_MSG = {
    required: '필수 정보입니다.',
    invalidId:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invalidPwCheck: '비밀번호가 일치하지 않습니다.',
}

// 1. autofocus 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
window.addEventListener('load', () => {
    $id.focus()
})

const IdFormEvent = (e) => {
    if (e.target.value.length === 0) {
        $idMsg.innerHTML = ERROR_MSG.required
        console.log(($id.classList.add = 'border-red-600'))
    } else if (ID_REGEX.test(e.target.value) === false) {
        $idMsg.innerHTML = ERROR_MSG.invalidId
        $id.classList.add('border-red-600')
    } else {
        $id.classList.remove('border-red-600')
        $idMsg.innerHTML = ''
    }
}

const PwFormEvent = (e) => {
    if (e.target.value.length === 0) {
        $pwMsg.innerHTML = ERROR_MSG.required
        console.log(($pw.classList.add = 'border-red-600'))
    } else if (PW_REGEX.test(e.target.value) === false) {
        $pwMsg.innerHTML = ERROR_MSG.invalidId
        $pw.classList.add('border-red-600')
    } else {
        $pw.classList.remove('border-red-600')
        $pwMsg.innerHTML = ''
    }
}

const checkPwEvent = (e) => {
    if ($pw.value === e.target.value) {
        return
    } else if ($pw.value !== e.target.value) {
        $pwCheckMsg.innerHTML = ERROR_MSG.invalidPwCheck
        $pwCheck.classList.add('border-red-600')
    } else {
        $pw.classList.remove('border-red-600')
        $pwMsg.innerHTML = ''
    }
}

const checkValidFormEvent = (e) => {
    e.preventDefault()
    if ($id.value && $pw.value && $pwCheck.value) {
        openModal()
    }
}

// 4. 입력 확인 모달 창
const openModal = () => {
    // "취소하기" 버튼 클릭 시 모달 창이 닫혀야 합니다.
    // "가입하기" 버튼 클릭 시 윈도우의 alert 창에 메세지 띄우기
    $modal.showModal()
    const confirmID = document.getElementById('confirm-id')
    const confirmPw = document.getElementById('confirm-pw')
    const cancleBtn = document.getElementById('cancel-btn')
    const approveBtn = document.getElementById('approve-btn')

    confirmID.innerHTML = $id.value
    confirmPw.innerHTML = $pw.value

    cancleBtn.addEventListener('click', () => {
        $modal.close()
    })
    approveBtn.addEventListener('click', () => {
        alert('가입되었습니다 🥳 ')
        $modal.close()
    })
}

// 2. 유효성 검사 로직 : ID, 비밀번호, 비밀번호 확인 필드에 대한 유효성 검사를 수행해야 합니다.
// 유효성 검사 시점 : input focus out 시 해당 input의 유효성을 검사합니다.
$id.addEventListener('focusout', IdFormEvent)
$pw.addEventListener('focusout', PwFormEvent)
$pwCheck.addEventListener('focusout', checkPwEvent)

// 3.가입하기 버튼을 눌렀을 때 모든 필드의 유효성을 검사합니다.
// 제출하기 버튼 클릭 시, 모든 input의 값이 유효한 상태일 경우 입력한 아이디와 비밀번호를 확인할 수 있는 모달 창을 보여주어야 합니다.
$submit.addEventListener('click', checkValidFormEvent)
