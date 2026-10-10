const workouts = [
  {title:"صدر + ترايسبس", duration:"45–60 دقيقة", note:"ابدأ بإحماء 5–10 دقائق. استخدم وزن تقدر تتحكم فيه من غير ما تضحي بالتكنيك.", exercises:[["ضغط صدر بالدامبل","3 مجموعات × 8–12 تكرار"],["ضغط مائل بالدامبل","3 × 8–12"],["تفتيح صدر بالكابل أو الدامبل","2 × 10–15"],["مد ترايسبس بالكابل","3 × 10–15"],["ضغط ترايسبس خفيف","2 × 10–12"]]},
  {title:"ظهر + بايسبس", duration:"45–60 دقيقة", note:"حافظ على ظهرك في وضع ثابت واسحب بتحكم من غير اندفاع.", exercises:[["سحب علوي","3 مجموعات × 8–12 تكرار"],["تجديف جهاز","3 × 8–12"],["سحب ذراع واحدة","2 × 10–12 لكل ناحية"],["بايسبس دامبل","3 × 10–12"],["هامر كيرل","2 × 10–12"]]},
  {title:"راحة أو مشي", duration:"20–30 دقيقة اختياري", note:"الراحة جزء من التطور. اختار مشيًا مريحًا أو حركة خفيفة، ومش لازم تتمرن لو محتاج تستريح.", exercises:[["مشي مريح","15–30 دقيقة اختياري"],["حركة للمفاصل","5 دقائق اختياري"],["تمدد لطيف","حسب راحتك"]]},
  {title:"رجلين + بطن", duration:"45–60 دقيقة", note:"ابدأ بوزن خفيف وتعلم الحركة الصحيحة، خصوصًا في تمارين الرجلين.", exercises:[["سكوات وزن الجسم أو جهاز","3 مجموعات × 8–12 تكرار"],["ضغط رجلين","3 × 10–12"],["ثني الرجل الخلفية","3 × 10–15"],["رفع السمانة","2 × 12–15"],["بلانك","3 مرات × 20–40 ثانية"]]},
  {title:"كتف + ذراع", duration:"40–55 دقيقة", note:"خلي الحركة متحكم فيها، وتجنب الأوزان اللي تسبب ألمًا أو تخليك تهز جسمك.", exercises:[["ضغط كتف جهاز","3 مجموعات × 8–12 تكرار"],["رفرفة جانبي","3 × 12–15"],["رفرفة خلفي","2 × 12–15"],["بايسبس بالكابل أو دامبل","2 × 10–12"],["ترايسبس بالكابل","2 × 10–12"]]},
  {title:"كارديو خفيف", duration:"20–35 دقيقة", note:"اختار نشاط تقدر تتكلم أثناءه من غير نهجان شديد. قلل المدة أو الشدة حسب مستواك.", exercises:[["مشي سريع أو عجلة","15–25 دقيقة"],["حركة مرونة","5–10 دقائق"],["تنفس وتهدئة","3 دقائق"]]},
  {title:"راحة واستشفاء", duration:"يوم راحة", note:"النوم المنتظم والأكل المتوازن والراحة بيساعدوا جسمك يتعافى. مش مطلوب تعوض الراحة بتمرين زيادة.", exercises:[["راحة من التمرين الشديد","طول اليوم"],["مياه ووجبات متوازنة","على مدار اليوم"],["نوم منتظم","حسب احتياجك"]]}
];
const dayNames = ["السبت","الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"];
const dayList = document.getElementById("dayList");
const exerciseList = document.getElementById("exerciseList");
let currentDay = 0;

function renderWorkout(index) {
  currentDay = index;
  const workout = workouts[index];
  document.querySelectorAll(".day-btn").forEach(btn => {
    const active = Number(btn.dataset.day) === index;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  document.getElementById("workoutTitle").textContent = workout.title;
  document.getElementById("workoutDuration").textContent = workout.duration;
  document.getElementById("workoutNote").textContent = workout.note;
  exerciseList.replaceChildren();
  workout.exercises.forEach((exercise, i) => {
    const label = document.createElement("label");
    label.className = "exercise";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", "تم إنجاز " + exercise[0]);
    checkbox.addEventListener("change", () => {
      label.classList.toggle("done", checkbox.checked);
      try { localStorage.setItem(`titan-${index}-${i}`, checkbox.checked ? "1" : "0"); } catch {}
    });
    try {
      checkbox.checked = localStorage.getItem(`titan-${index}-${i}`) === "1";
      label.classList.toggle("done", checkbox.checked);
    } catch {}
    const name = document.createElement("span");
    name.className = "exercise-name";
    name.textContent = exercise[0];
    const detail = document.createElement("small");
    detail.textContent = exercise[1];
    name.appendChild(detail);
    const sets = document.createElement("span");
    sets.className = "sets";
    sets.textContent = checkbox.checked ? "تم ✓" : "خطة اليوم";
    checkbox.addEventListener("change", () => sets.textContent = checkbox.checked ? "تم ✓" : "خطة اليوم");
    label.append(checkbox, name, sets);
    exerciseList.appendChild(label);
  });
}
dayList.addEventListener("click", event => {
  const button = event.target.closest(".day-btn");
  if (button) renderWorkout(Number(button.dataset.day));
});
document.getElementById("resetExercises").addEventListener("click", () => {
  workouts[currentDay].exercises.forEach((_, i) => {
    try { localStorage.removeItem(`titan-${currentDay}-${i}`); } catch {}
  });
  renderWorkout(currentDay);
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
document.querySelectorAll("[data-plan]").forEach(link => link.addEventListener("click", () => {
  const map = {muscle:0,fitness:5,balance:3};
  renderWorkout(map[link.dataset.plan] ?? 0);
}));
document.getElementById("calcBmi").addEventListener("click", () => {
  const height = Number(document.getElementById("height").value);
  const weight = Number(document.getElementById("weight").value);
  const error = document.getElementById("bmiError");
  error.textContent = "";
  if (!height || !weight || height < 100 || height > 250 || weight < 20 || weight > 350) {
    error.textContent = "اكتب طولًا من 100 إلى 250 سم ووزنًا من 20 إلى 350 كجم.";
    return;
  }
  const bmi = weight / ((height / 100) ** 2);
  document.getElementById("bmiValue").textContent = bmi.toFixed(1);
  let category, message;
  if (bmi < 18.5) { category = "أقل من نطاق البالغين المعتاد"; message = "الرقم وحده مش تشخيص. لو قلقان من وزنك، استشر مختصًا."; }
  else if (bmi < 25) { category = "ضمن نطاق البالغين المعتاد"; message = "ده مؤشر عام فقط، ومش بيقيس نسبة الدهون أو العضلات."; }
  else if (bmi < 30) { category = "أعلى من نطاق البالغين المعتاد"; message = "راجع صحتك وعاداتك مع مختص لو محتاج تقييمًا أدق."; }
  else { category = "نطاق مرتفع للبالغين"; message = "مؤشر BMI مش تشخيص؛ مختص يقدر يقيّم حالتك بشكل مناسب."; }
  document.getElementById("bmiCategory").textContent = category;
  document.getElementById("bmiMessage").textContent = message;
});
document.getElementById("year").textContent = new Date().getFullYear();
renderWorkout(0);
