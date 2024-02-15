// 사용자 입력 요소 참조
const $category = document.querySelector("#category");
const $date = document.querySelector("#date");
const $status = document.querySelector("#status");
const $cost = document.querySelector("#cost");
const $field_result = document.querySelector(".field-result");
const $form = document.querySelector("form");

// openAI API
import config from "../src/config.js";
const url = config.apikey;

// 언어 변환 버튼 참조
const btn_change_language = document.querySelector("#btn-change-language");
const translations = {
    "Log in": "로그인",
    로그인: "Log in",
    Language: "언어",
    언어: "Language",
    테마: "theme",
    theme: "테마",
    "물품 정보 입력": "Enter item information",
    "Enter item information": "물품 정보 입력",
    "구성품을 갖고 계신가요?": "Do you have components?",
    "Do you have components?": "구성품을 갖고 계신가요?",
    있다: "Yes",
    Yes: "있다",
    없다: "No",
    No: "없다",
    "품목을 선택해주세요": "Please select a category",
    "Please select a category": "품목을 선택해주세요",
    "사용 기간을 선택해주세요": "Please select a period of use",
    "Please select a period of use": "사용 기간을 선택해주세요",
    "물품의 상태를 선택해주세요": "Please select the condition of the item",
    "Please select the condition of the item": "물품의 상태를 선택해주세요",
    "구매한 가격을 입력해주세요": "Please enter the purchase price",
    "Please enter the purchase price": "구매한 가격을 입력해주세요",
    계산하기: "Calculate",
    Calculate: "계산하기",
    "계산 결과": "Calculation result",
    "Calculation result": "계산 결과",
};

// 언어 변환 버튼이 눌린 상태를 추적하는 변수
let is_english = false;

// 언어를 변경해주는 함수
btn_change_language.addEventListener("click", function () {
    is_english = !is_english;
    document.body.querySelectorAll("*").forEach(function (node) {
        if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
            const text = node.textContent.trim();
            if (translations[text]) {
                node.textContent = translations[text];
            }
        }
    });
});

// 버튼 클릭 시 테마 전환
document.querySelector("#btn-theme").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

// 질문 초기화
let question;

// 질문과 답변 저장
let data = [
    {
        role: "system",
        content: "assistant는 친절한 답변가이다.",
    },
];

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];

// 사용자의 질문을 객체를 만들어서 push
const sendQuestion = (question) => {
    if (question) {
        data.push({
            role: "user",
            content: question,
        });
        questionData.push({
            role: "user",
            content: question,
        });
    }
};

// 화면에 질문과 답변 그려주는 함수
const printAnswer = (answer) => {
    $field_result.innerText += `[질문]\n${question}\n\n`;
    $field_result.innerText += `[답변]\n${answer}`;
};

// api 요청보내는 함수
const apiPost = async () => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
        .then((res) => res.json())
        .then((res) => {
            const answer = res.choices[0].message.content;
            printAnswer(answer);

            // 요청이 성공적으로 완료되었으므로 input 필드 초기화
            $category.value = "";
            $date.value = "";
            $status.value = "";
            $cost.value = "";

            // radio 버튼 초기화
            const radioValue = document.getElementsByName("component");
            radioValue.forEach((radio) => {
                if (radio.checked) {
                    radio.checked = false;
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// 사용자의 radio 선택값을 반환하는 함수
const getValue = () => {
    let curr_value;
    const radioValue = document.getElementsByName("component");
    radioValue.forEach((radio) => {
        if (radio.checked) {
            curr_value = radio.defaultValue;
        }
    });
    return curr_value;
};

// form에 대한 'submit' 이벤트 리스너
$form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 계산 결과창 1번 초기화
    $field_result.innerText = "";

    // 사용자의 입력으로 질문 생성
    const selectedCategory = $category.value;
    const selectedDate = $date.value;
    const selectedStatus = $status.value;
    const enteredCost = $cost.value;
    const selectedComponents = getValue();

    question = `${selectedCategory} 품목을 판매하려고 한다.
    ${selectedDate} 사용했고 상태는 ${selectedStatus}.
    구매한 가격은 ${enteredCost}원이고 구성요소는 ${selectedComponents}.
    구매한 가격의 몇 %로 팔면 좋을까?`;

    // is_english 값에 따라 질문 추가
    if (is_english) {
        question += "영어로 답변해줘.";
    }

    sendQuestion(question);
    apiPost();
});
