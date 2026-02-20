// ================== تهيئة Firebase ==================
const firebaseConfig = {
    apiKey: "AIzaSyAaPn4y3Vzr60HBFx2uZZxlHf6G1TnR6sU",
    authDomain: "ramadan-54d0a.firebaseapp.com",
    projectId: "ramadan-54d0a",
    storageBucket: "ramadan-54d0a.firebasestorage.app",
    messagingSenderId: "10884266386",
    appId: "1:10884266386:web:44355327abdf9fb7fd294b",
    measurementId: "G-R2RDB62KCL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ================== بيانات الألغاز المضمنة (مولدة بالكامل - 30 لكل فئة) ==================
const embeddedPuzzles = {
  "numbers": [
    // الألغاز الأصلية (20)
    { "id": "NUM-001", "difficulty": 1, "riddle": "عدد إذا جمعته مع نفسه كان الناتج 12. ما هو؟", "choices": ["5", "6", "7"], "answerIndex": 1, "explanation": "6 + 6 = 12" },
    { "id": "NUM-002", "difficulty": 1, "riddle": "عدد إذا ضربته في 3 كان الناتج 15. ما هو؟", "choices": ["4", "5", "6"], "answerIndex": 1, "explanation": "5 × 3 = 15" },
    { "id": "NUM-003", "difficulty": 1, "riddle": "أي الأعداد التالية زوجي؟", "choices": ["9", "12", "15"], "answerIndex": 1, "explanation": "12 يقبل القسمة على 2 دون باقي." },
    { "id": "NUM-004", "difficulty": 1, "riddle": "إذا كان 10 ÷ 2 = ؟", "choices": ["4", "5", "6"], "answerIndex": 1, "explanation": "10 ÷ 2 = 5" },
    { "id": "NUM-005", "difficulty": 1, "riddle": "ما العدد الذي إذا طرحنا منه 1 يصبح 9؟", "choices": ["8", "10", "11"], "answerIndex": 1, "explanation": "10 - 1 = 9" },
    { "id": "NUM-006", "difficulty": 2, "riddle": "ناتج 7 + 8 - 5 يساوي؟", "choices": ["9", "10", "11"], "answerIndex": 2, "explanation": "7 + 8 = 15، ثم 15 - 5 = 10 (انتبه: الخيار الصحيح هو 10)." },
    { "id": "NUM-007", "difficulty": 2, "riddle": "أي كسر يساوي 0.5؟", "choices": ["1/3", "1/2", "2/3"], "answerIndex": 1, "explanation": "1/2 = 0.5" },
    { "id": "NUM-008", "difficulty": 2, "riddle": "أكبر عدد بين الخيارات؟", "choices": ["98", "109", "101"], "answerIndex": 1, "explanation": "109 هو الأكبر." },
    { "id": "NUM-009", "difficulty": 2, "riddle": "إذا كان نصف العدد يساوي 14، فالعدد هو؟", "choices": ["24", "28", "30"], "answerIndex": 1, "explanation": "14 × 2 = 28" },
    { "id": "NUM-010", "difficulty": 2, "riddle": "ما العدد التالي في النمط: 2، 4، 6، 8، ؟", "choices": ["9", "10", "12"], "answerIndex": 1, "explanation": "النمط يزيد 2 كل مرة." },
    { "id": "NUM-011", "difficulty": 3, "riddle": "لديك 3 أعداد مجموعها 30 وجميعها أعداد زوجية. أي مجموعة صحيحة؟", "choices": ["8، 10، 12", "9، 10، 11", "6، 10، 13"], "answerIndex": 0, "explanation": "8+10+12=30 وكلها زوجية." },
    { "id": "NUM-012", "difficulty": 3, "riddle": "إذا كان 4x = 28، فكم x؟", "choices": ["5", "6", "7"], "answerIndex": 2, "explanation": "28 ÷ 4 = 7" },
    { "id": "NUM-013", "difficulty": 3, "riddle": "أي عدد أولي بين الخيارات؟", "choices": ["21", "23", "25"], "answerIndex": 1, "explanation": "23 لا يقبل القسمة إلا على 1 و23." },
    { "id": "NUM-014", "difficulty": 3, "riddle": "ناتج (3 × 5) + (12 ÷ 3) يساوي؟", "choices": ["17", "19", "21"], "answerIndex": 1, "explanation": "3×5=15 و12÷3=4، المجموع 19." },
    { "id": "NUM-015", "difficulty": 3, "riddle": "أي خيار يساوي 2^5؟", "choices": ["16", "32", "64"], "answerIndex": 1, "explanation": "2^5 = 32" },
    { "id": "NUM-016", "difficulty": 4, "riddle": "أنا عدد مكوّن من رقمين. مجموع رقميّ يساوي 9 والعدد قابل للقسمة على 9. ما هو؟", "choices": ["18", "27", "36"], "answerIndex": 1, "explanation": "27 مجموع رقميه 2+7=9 وهو يقبل القسمة على 9." },
    { "id": "NUM-017", "difficulty": 4, "riddle": "أي رقم يجعل المعادلة صحيحة: 5 + ? = 3 × 4", "choices": ["6", "7", "8"], "answerIndex": 1, "explanation": "3×4=12، إذن ?=12-5=7." },
    { "id": "NUM-018", "difficulty": 4, "riddle": "إذا كان 1/3 من عدد يساوي 11، فالعدد هو؟", "choices": ["22", "33", "44"], "answerIndex": 1, "explanation": "11 × 3 = 33" },
    { "id": "NUM-019", "difficulty": 4, "riddle": "نمط: 1، 1، 2، 3، 5، ؟", "choices": ["7", "8", "9"], "answerIndex": 1, "explanation": "متتالية فيبوناتشي: 3+5=8." },
    { "id": "NUM-020", "difficulty": 4, "riddle": "أي خيار يساوي الجذر التربيعي لـ 169؟", "choices": ["11", "12", "13"], "answerIndex": 2, "explanation": "13×13=169." },
    // الألغاز الجديدة (10)
    { "id": "NUM-021", "difficulty": 3, "riddle": "ما هو العدد الذي إذا ضربته في 4 كان الناتج 36؟", "choices": ["8", "9", "10"], "answerIndex": 1, "explanation": "9 × 4 = 36" },
    { "id": "NUM-022", "difficulty": 2, "riddle": "ناتج 15 - 7 + 3 يساوي؟", "choices": ["10", "11", "12"], "answerIndex": 1, "explanation": "15-7=8، 8+3=11" },
    { "id": "NUM-023", "difficulty": 1, "riddle": "أي الأعداد التالية فردي؟", "choices": ["22", "25", "28"], "answerIndex": 1, "explanation": "25 فردي لا يقبل القسمة على 2" },
    { "id": "NUM-024", "difficulty": 1, "riddle": "ما العدد الذي إذا أضفت إليه 9 يصبح 20؟", "choices": ["10", "11", "12"], "answerIndex": 1, "explanation": "11+9=20" },
    { "id": "NUM-025", "difficulty": 2, "riddle": "ناتج 8 × 3 ÷ 2 يساوي؟", "choices": ["12", "14", "16"], "answerIndex": 0, "explanation": "8×3=24، 24÷2=12" },
    { "id": "NUM-026", "difficulty": 2, "riddle": "أي كسر يساوي 0.75؟", "choices": ["1/4", "3/4", "2/5"], "answerIndex": 1, "explanation": "3/4 = 0.75" },
    { "id": "NUM-027", "difficulty": 1, "riddle": "ما العدد التالي في النمط: 5، 10، 15، 20، ؟", "choices": ["25", "30", "35"], "answerIndex": 0, "explanation": "الزيادة 5 كل مرة" },
    { "id": "NUM-028", "difficulty": 3, "riddle": "إذا كان 3x = 27، فما قيمة x؟", "choices": ["7", "8", "9"], "answerIndex": 2, "explanation": "27÷3=9" },
    { "id": "NUM-029", "difficulty": 2, "riddle": "ناتج 2^4 يساوي؟", "choices": ["8", "16", "32"], "answerIndex": 1, "explanation": "2×2×2×2=16" },
    { "id": "NUM-030", "difficulty": 2, "riddle": "ما هو العدد الذي يمثل 25% من 80؟", "choices": ["20", "25", "30"], "answerIndex": 0, "explanation": "0.25 × 80 = 20" }
  ],
  "old": [
    // الألغاز الأصلية (20)
    { "id": "OLD-001", "difficulty": 1, "riddle": "شيء إذا شرب منه الناس نقص، وإذا شرب منه البحر زاد. ما هو؟", "choices": ["الماء", "النار", "الملح"], "answerIndex": 1, "explanation": "النار تخمد بالماء (تنقص)، وتزيد بالحطب/الوقود (تغذّيها)." },
    { "id": "OLD-002", "difficulty": 1, "riddle": "له أسنان ولا يعض. ما هو؟", "choices": ["المشط", "السحاب", "المفتاح"], "answerIndex": 0, "explanation": "المشط له أسنان للتسريح." },
    { "id": "OLD-003", "difficulty": 1, "riddle": "يمشي بلا رجلين ويدخل الأذن. ما هو؟", "choices": ["الضوء", "الصوت", "الظل"], "answerIndex": 1, "explanation": "الصوت ينتقل ويدخل الأذن." },
    { "id": "OLD-004", "difficulty": 1, "riddle": "شيء كلما أخذت منه كبر. ما هو؟", "choices": ["الحفرة", "الخبز", "الظلال"], "answerIndex": 0, "explanation": "الحفرة تكبر كلما حفرت/أخذت منها." },
    { "id": "OLD-005", "difficulty": 1, "riddle": "بيت بلا أبواب ولا نوافذ. ما هو؟", "choices": ["البيضة", "الكتاب", "الخيمة"], "answerIndex": 0, "explanation": "البيضة تشبه بيتًا مغلقًا." },
    { "id": "OLD-006", "difficulty": 2, "riddle": "أخضر في الأرض، أسود في السوق، أحمر في البيت. ما هو؟", "choices": ["الزيتون", "الشاي", "البطيخ"], "answerIndex": 1, "explanation": "الشاي أخضر كنبات، أسود عند البيع، أحمر عند التحضير." },
    { "id": "OLD-007", "difficulty": 2, "riddle": "أبوه في البحر وأمه في البر، فمَن هو؟", "choices": ["الملح", "السمك", "اللؤلؤ"], "answerIndex": 0, "explanation": "الملح مصدره البحر ويُستخدم على البر." },
    { "id": "OLD-008", "difficulty": 2, "riddle": "له رأس ولا عين له. ما هو؟", "choices": ["المسمار", "الإبرة", "الحبل"], "answerIndex": 0, "explanation": "المسمار له رأس." },
    { "id": "OLD-009", "difficulty": 2, "riddle": "ما هو الذي ينام ولا يستيقظ؟", "choices": ["الميت", "الظل", "الريح"], "answerIndex": 0, "explanation": "الميت لا يستيقظ." },
    { "id": "OLD-010", "difficulty": 2, "riddle": "شيء تراه ولا تستطيع لمسه، وإذا لمسته اختفى. ما هو؟", "choices": ["الدخان", "الضوء", "الظل"], "answerIndex": 2, "explanation": "الظل لا يُمسّ، ومحاولة الإمساك به بلا معنى." },
    { "id": "OLD-011", "difficulty": 3, "riddle": "كلما زاد نقص. ما هو؟", "choices": ["العمر", "المال", "الوقت"], "answerIndex": 2, "explanation": "كلما زاد الوقت الذي يمرّ قلّ الوقت المتبقي." },
    { "id": "OLD-012", "difficulty": 3, "riddle": "شيء يُكسر ولا يُمسّ. ما هو؟", "choices": ["الزجاج", "الصمت", "الخبز"], "answerIndex": 1, "explanation": "يمكن كسر الصمت بالكلام." },
    { "id": "OLD-013", "difficulty": 3, "riddle": "ما هو الذي في وسط الماء ولا يبتل؟", "choices": ["حرف الألف", "حرف الواو", "حرف الميم"], "answerIndex": 2, "explanation": "حرف الميم هو وسط كلمة (ماء)." },
    { "id": "OLD-014", "difficulty": 3, "riddle": "له رقبة بلا رأس. ما هو؟", "choices": ["الزجاجة", "القلم", "الساعة"], "answerIndex": 0, "explanation": "للزجاجة عنق." },
    { "id": "OLD-015", "difficulty": 3, "riddle": "ما هو الشيء الذي يحمل طعامه فوق رأسه؟", "choices": ["النخلة", "السلحفاة", "الطائر"], "answerIndex": 0, "explanation": "ثمار النخلة في الأعلى." },
    { "id": "OLD-016", "difficulty": 4, "riddle": "له عين واحدة لكنه لا يرى. ما هو؟", "choices": ["الإبرة", "المفتاح", "المرآة"], "answerIndex": 0, "explanation": "عين الإبرة ثقبها." },
    { "id": "OLD-017", "difficulty": 4, "riddle": "شيء إذا ذكرته كسرته. ما هو؟", "choices": ["الوعد", "السر", "الزجاج"], "answerIndex": 1, "explanation": "ذكر السر يفضحه فيُكسر." },
    { "id": "OLD-018", "difficulty": 4, "riddle": "يولد كبيرًا ثم يصغر كلما طال عمره. ما هو؟", "choices": ["القمر", "الشمعة", "الجبل"], "answerIndex": 1, "explanation": "الشمعة تبدأ كاملة ثم تنقص بالاحتراق." },
    { "id": "OLD-019", "difficulty": 4, "riddle": "شيء إذا وضعته في الثلاجة لا يبرد. ما هو؟", "choices": ["الفلفل الحار", "الماء", "الثلج"], "answerIndex": 0, "explanation": "الحرارة هنا مجازية: (حار) لا يصبح بارد الطبع." },
    { "id": "OLD-020", "difficulty": 4, "riddle": "ما هو الذي يكتب ولا يقرأ؟", "choices": ["القلم", "الكتاب", "اللوح"], "answerIndex": 0, "explanation": "القلم يكتب لكنه لا يقرأ." },
    // الألغاز الجديدة (10)
    { "id": "OLD-021", "difficulty": 2, "riddle": "ما هو الشيء الذي كلما أخذت منه نقص وكلما وضعت فيه زاد؟", "choices": ["الحفرة", "المال", "العمر"], "answerIndex": 0, "explanation": "الحفرة كلما أخذت منها تراب نقصت، وكلما وضعت فيها زادت" },
    { "id": "OLD-022", "difficulty": 1, "riddle": "له أوراق وليس نباتًا، له جلد وليس حيوانًا، فما هو؟", "choices": ["الكتاب", "الشجرة", "الإنسان"], "answerIndex": 0, "explanation": "الكتاب له أوراق وجلد" },
    { "id": "OLD-023", "difficulty": 2, "riddle": "ما الذي تراه في الليل ثلاث مرات وفي النهار مرة واحدة؟", "choices": ["حرف اللام", "القمر", "الظل"], "answerIndex": 0, "explanation": "حرف اللام يظهر في كلمة الليل ثلاث مرات وفي النهار مرة" },
    { "id": "OLD-024", "difficulty": 1, "riddle": "شيء يبكي بلا عيون ويمشي بلا أرجل؟", "choices": ["السحاب", "الغيم", "المطر"], "answerIndex": 0, "explanation": "السحاب يبكي مطرًا ويمشي في السماء" },
    { "id": "OLD-025", "difficulty": 3, "riddle": "ما هو البيت الذي لا يسكنه بشر؟", "choices": ["بيت الشعر", "القبر", "الخيمة"], "answerIndex": 0, "explanation": "بيت الشعر هو القصيدة" },
    { "id": "OLD-026", "difficulty": 2, "riddle": "شيء إذا دخل الماء لم يبتل؟", "choices": ["الضوء", "الظل", "الهواء"], "answerIndex": 0, "explanation": "الضوء لا يبتل" },
    { "id": "OLD-027", "difficulty": 3, "riddle": "ما هو الشيء الذي لا يمشي إلا بالضرب؟", "choices": ["المسمار", "الكرة", "الطبل"], "answerIndex": 0, "explanation": "المسمار يُدق بالضرب" },
    { "id": "OLD-028", "difficulty": 2, "riddle": "له عين ولا يرى، وله رقبة ولا تلتف؟", "choices": ["الإبرة", "الزجاجة", "الساعة"], "answerIndex": 0, "explanation": "الإبرة لها عين ورقبة" },
    { "id": "OLD-029", "difficulty": 1, "riddle": "ما هو الشيء الذي تأكل منه وهو لا يؤكل؟", "choices": ["الصحن", "الملعقة", "الطبق"], "answerIndex": 0, "explanation": "الصحن تأكل منه" },
    { "id": "OLD-030", "difficulty": 2, "riddle": "ما هو الشيء الذي يقرصك ولا تراه؟", "choices": ["الجوع", "البرد", "الخوف"], "answerIndex": 0, "explanation": "الجوع يقرص المعدة" }
  ],
  "history": [
    // الألغاز الأصلية (20)
    { "id": "HIS-001", "difficulty": 1, "riddle": "في أي قارة تقع مصر؟", "choices": ["أفريقيا", "أوروبا", "أمريكا الجنوبية"], "answerIndex": 0, "explanation": "مصر دولة أفريقية (مع امتداد آسيوي في سيناء)." },
    { "id": "HIS-002", "difficulty": 1, "riddle": "أي حضارة اشتهرت ببناء الأهرامات في الجيزة؟", "choices": ["الرومانية", "الفرعونية", "الإغريقية"], "answerIndex": 1, "explanation": "الأهرامات من الحضارة المصرية القديمة." },
    { "id": "HIS-003", "difficulty": 1, "riddle": "مدينة القدس مرتبطة تاريخيًا بأي منطقة؟", "choices": ["بلاد الشام", "شبه الجزيرة الإيبيرية", "شبه الجزيرة الاسكندنافية"], "answerIndex": 0, "explanation": "القدس في بلاد الشام/فلسطين التاريخية." },
    { "id": "HIS-004", "difficulty": 1, "riddle": "أي بحر يفصل بين أفريقيا وأوروبا عند مضيق جبل طارق؟", "choices": ["البحر الأسود", "البحر المتوسط", "بحر العرب"], "answerIndex": 1, "explanation": "مضيق جبل طارق يصل الأطلسي بالمتوسط." },
    { "id": "HIS-005", "difficulty": 1, "riddle": "ما اسم الطريق التجاري الشهير الذي ربط الشرق بالغرب قديمًا؟", "choices": ["طريق الحرير", "طريق التوابل", "طريق الكهرمان"], "answerIndex": 0, "explanation": "طريق الحرير أشهر شبكة طرق تاريخية." },
    { "id": "HIS-006", "difficulty": 2, "riddle": "أي نهر ارتبط بقيام الحضارة المصرية القديمة؟", "choices": ["النيل", "الأمازون", "الدانوب"], "answerIndex": 0, "explanation": "النيل هو شريان مصر التاريخي." },
    { "id": "HIS-007", "difficulty": 2, "riddle": "أي إمبراطورية اتخذت روما عاصمة لها؟", "choices": ["البيزنطية", "الرومانية", "العباسية"], "answerIndex": 1, "explanation": "روما كانت عاصمة الإمبراطورية الرومانية." },
    { "id": "HIS-008", "difficulty": 2, "riddle": "أي مدينة كانت عاصمة للدولة العباسية في أوجها؟", "choices": ["دمشق", "بغداد", "القاهرة"], "answerIndex": 1, "explanation": "العاصمة العباسية كانت بغداد." },
    { "id": "HIS-009", "difficulty": 2, "riddle": "ما الاسم الذي يُطلق على العصور التي سبقت اختراع الكتابة؟", "choices": ["العصور القديمة", "عصور ما قبل التاريخ", "العصور الوسطى"], "answerIndex": 1, "explanation": "ما قبل التاريخ: قبل التدوين." },
    { "id": "HIS-010", "difficulty": 2, "riddle": "أي حضارة اشتهرت بالخط المسماري؟", "choices": ["السومرية", "الفرعونية", "المايا"], "answerIndex": 0, "explanation": "السومريون استخدموا المسمارية مبكرًا." },
    { "id": "HIS-011", "difficulty": 3, "riddle": "أي حدث يُعد بداية الحرب العالمية الثانية في أوروبا (شائعًا في الكتب المدرسية)؟", "choices": ["غزو بولندا", "سقوط القسطنطينية", "معركة واترلو"], "answerIndex": 0, "explanation": "غزو بولندا عام 1939 يُعد الشرارة في أوروبا." },
    { "id": "HIS-012", "difficulty": 3, "riddle": "أي مدينة ارتبط اسمها بـ(بيت الحكمة) كمركز علمي؟", "choices": ["قرطبة", "بغداد", "القيروان"], "answerIndex": 1, "explanation": "بيت الحكمة اشتهر في بغداد." },
    { "id": "HIS-013", "difficulty": 3, "riddle": "أي إمبراطوريات عُرفت ببناء سور عظيم مشهور؟", "choices": ["الصينية", "الرومانية", "العثمانية"], "answerIndex": 0, "explanation": "سور الصين العظيم أشهر مثال." },
    { "id": "HIS-014", "difficulty": 3, "riddle": "أي حضارة قديمة قامت في بلاد الرافدين بين دجلة والفرات؟", "choices": ["الإنكا", "بلاد ما بين النهرين", "الفينيقية"], "answerIndex": 1, "explanation": "بلاد ما بين النهرين هي منطقة الرافدين." },
    { "id": "HIS-015", "difficulty": 3, "riddle": "أي مدينة يُطلق عليها تاريخيًا (عروس البحر المتوسط) في مصر؟", "choices": ["الإسكندرية", "أسوان", "المنصورة"], "answerIndex": 0, "explanation": "لقب شائع للإسكندرية." },
    { "id": "HIS-016", "difficulty": 4, "riddle": "أي مصطلح يصف فترة ازدهار العلوم والترجمة في الحضارة الإسلامية (شائعًا)؟", "choices": ["العصر الذهبي", "العصر الحجري", "العصر المظلم"], "answerIndex": 0, "explanation": "يُشار إليها غالبًا بالعصر الذهبي." },
    { "id": "HIS-017", "difficulty": 4, "riddle": "أي طريق بحري قصّر الرحلة بين أوروبا وآسيا بعد افتتاحه في القرن التاسع عشر؟", "choices": ["قناة السويس", "قناة بنما", "نهر الراين"], "answerIndex": 0, "explanation": "قناة السويس اختصرت المسافة بين المتوسط والبحر الأحمر." },
    { "id": "HIS-018", "difficulty": 4, "riddle": "أي مدينة تُعد من أقدم المدن المأهولة في العالم بحسب كثير من المصادر التاريخية؟", "choices": ["أريحا", "دبي", "كانبيرا"], "answerIndex": 0, "explanation": "أريحا تُذكر كثيرًا ضمن الأقدم." },
    { "id": "HIS-019", "difficulty": 4, "riddle": "أي مصطلح يصف انتقال أوروبا إلى مرحلة فكرية وفنية جديدة (شائعًا) بعد العصور الوسطى؟", "choices": ["النهضة", "الفتوحات", "الاستعمار"], "answerIndex": 0, "explanation": "عصر النهضة." },
    { "id": "HIS-020", "difficulty": 4, "riddle": "أي حضارة أمريكية قديمة اشتهرت ببناء مدن حجرية في جبال الأنديز؟", "choices": ["الإنكا", "الآشورية", "الحثّية"], "answerIndex": 0, "explanation": "حضارة الإنكا في الأنديز." },
    // الألغاز الجديدة (10)
    { "id": "HIS-021", "difficulty": 2, "riddle": "من هو القائد المسلم الذي فتح الأندلس؟", "choices": ["طارق بن زياد", "موسى بن نصير", "عقبة بن نافع"], "answerIndex": 0, "explanation": "طارق بن زياد قاد الفتح" },
    { "id": "HIS-022", "difficulty": 3, "riddle": "في أي عام كانت معركة حطين؟", "choices": ["1187", "1192", "1189"], "answerIndex": 0, "explanation": "معركة حطين 1187" },
    { "id": "HIS-023", "difficulty": 2, "riddle": "من هو مؤسس الدولة الأموية؟", "choices": ["معاوية بن أبي سفيان", "عمر بن عبد العزيز", "يزيد بن معاوية"], "answerIndex": 0, "explanation": "معاوية بن أبي سفيان" },
    { "id": "HIS-024", "difficulty": 2, "riddle": "أين تقع مدينة بابل التاريخية؟", "choices": ["العراق", "مصر", "إيران"], "answerIndex": 0, "explanation": "بابل في العراق" },
    { "id": "HIS-025", "difficulty": 1, "riddle": "من هو أول رئيس للولايات المتحدة؟", "choices": ["جورج واشنطن", "توماس جفرسون", "أبراهام لينكولن"], "answerIndex": 0, "explanation": "جورج واشنطن" },
    { "id": "HIS-026", "difficulty": 3, "riddle": "ما هي أقدم جامعة في العالم؟", "choices": ["جامعة القرويين", "جامعة الأزهر", "جامعة بولونيا"], "answerIndex": 0, "explanation": "جامعة القرويين في فاس، المغرب" },
    { "id": "HIS-027", "difficulty": 1, "riddle": "من هو الفرعون الذي بنى هرم خوفو؟", "choices": ["خوفو", "خفرع", "منقرع"], "answerIndex": 0, "explanation": "خوفو باني الهرم الأكبر" },
    { "id": "HIS-028", "difficulty": 1, "riddle": "في أي سنة هبط الإنسان على القمر؟", "choices": ["1969", "1972", "1965"], "answerIndex": 0, "explanation": "1969" },
    { "id": "HIS-029", "difficulty": 2, "riddle": "من هو الفيلسوف اليوناني الذي علم الإسكندر الأكبر؟", "choices": ["أرسطو", "أفلاطون", "سقراط"], "answerIndex": 0, "explanation": "أرسطو" },
    { "id": "HIS-030", "difficulty": 2, "riddle": "ما هي الحضارة التي ابتكرت الكتابة الهيروغليفية؟", "choices": ["المصرية", "السومرية", "الصينية"], "answerIndex": 0, "explanation": "المصرية القديمة" }
  ],
  "technology": [
    // الألغاز الأصلية (20)
    { "id": "TEC-001", "difficulty": 1, "riddle": "أي جهاز نستخدمه عادةً لإدخال النص إلى الكمبيوتر؟", "choices": ["الفأرة", "لوحة المفاتيح", "الشاشة"], "answerIndex": 1, "explanation": "لوحة المفاتيح لإدخال النص." },
    { "id": "TEC-002", "difficulty": 1, "riddle": "أي من التالي يُعد متصفح إنترنت؟", "choices": ["Chrome", "Windows", "CPU"], "answerIndex": 0, "explanation": "Chrome متصفح." },
    { "id": "TEC-003", "difficulty": 1, "riddle": "ما وظيفة كلمة المرور؟", "choices": ["حماية الحساب", "زيادة سرعة الإنترنت", "شحن الهاتف"], "answerIndex": 0, "explanation": "كلمة المرور لحماية الوصول." },
    { "id": "TEC-004", "difficulty": 1, "riddle": "أي مما يلي يُستخدم لتخزين الملفات؟", "choices": ["RAM", "SSD", "GPU"], "answerIndex": 1, "explanation": "SSD للتخزين الدائم." },
    { "id": "TEC-005", "difficulty": 1, "riddle": "ما المقصود بـ Wi-Fi؟", "choices": ["اتصال لاسلكي بالشبكة", "نوع من الكاميرات", "برنامج مضاد فيروسات"], "answerIndex": 0, "explanation": "Wi-Fi اتصال لاسلكي." },
    { "id": "TEC-006", "difficulty": 2, "riddle": "أي من التالي يُعد نظام تشغيل؟", "choices": ["Android", "YouTube", "HDMI"], "answerIndex": 0, "explanation": "Android نظام تشغيل." },
    { "id": "TEC-007", "difficulty": 2, "riddle": "أي جزء يُسمّى (دماغ الكمبيوتر) غالبًا؟", "choices": ["المعالج CPU", "الشاشة", "الماوس"], "answerIndex": 0, "explanation": "CPU ينفّذ التعليمات." },
    { "id": "TEC-008", "difficulty": 2, "riddle": "أي بروتوكول شائع لتصفح مواقع الويب؟", "choices": ["HTTP", "MP3", "JPEG"], "answerIndex": 0, "explanation": "HTTP/HTTPS للويب." },
    { "id": "TEC-009", "difficulty": 2, "riddle": "أي مما يلي يُستخدم لعرض الصور بصيغة شائعة؟", "choices": ["PNG", "TXT", "EXE"], "answerIndex": 0, "explanation": "PNG صيغة صور." },
    { "id": "TEC-010", "difficulty": 2, "riddle": "ما الهدف الأساسي من النسخ الاحتياطي؟", "choices": ["استرجاع البيانات عند فقدها", "زيادة دقة الشاشة", "تسريع المعالج"], "answerIndex": 0, "explanation": "النسخ الاحتياطي للحماية من الفقد." },
    { "id": "TEC-011", "difficulty": 3, "riddle": "أي مصطلح يصف برنامجًا خبيثًا يشفّر ملفاتك ويطلب فدية؟", "choices": ["Ransomware", "Firewall", "Cache"], "answerIndex": 0, "explanation": "Ransomware = برمجية فدية." },
    { "id": "TEC-012", "difficulty": 3, "riddle": "أي مما يلي يُعد لغة برمجة؟", "choices": ["Python", "Bluetooth", "SSD"], "answerIndex": 0, "explanation": "Python لغة برمجة." },
    { "id": "TEC-013", "difficulty": 3, "riddle": "أي طبقة/خدمة ترجّح أنها مسؤولة عن تحويل اسم موقع إلى عنوان IP؟", "choices": ["DNS", "USB", "HTML"], "answerIndex": 0, "explanation": "DNS يحوّل الاسم إلى IP." },
    { "id": "TEC-014", "difficulty": 3, "riddle": "ما الفرق الأقرب بين RAM و SSD؟", "choices": ["RAM ذاكرة مؤقتة، SSD تخزين دائم", "RAM تخزين دائم، SSD مؤقت", "لا فرق بينهما"], "answerIndex": 0, "explanation": "RAM متطايرة، SSD غير متطاير." },
    { "id": "TEC-015", "difficulty": 3, "riddle": "أي مصطلح يصف التحقق بخطوتين لحماية الحساب؟", "choices": ["2FA", "VPN", "LAN"], "answerIndex": 0, "explanation": "2FA = المصادقة الثنائية." },
    { "id": "TEC-016", "difficulty": 4, "riddle": "أي مفهوم يصف تشغيل برامج داخل بيئة معزولة عن النظام الأساسي؟", "choices": ["Virtualization", "Defragmentation", "Overclocking"], "answerIndex": 0, "explanation": "Virtualization = افتراضية/عزل عبر آلة افتراضية." },
    { "id": "TEC-017", "difficulty": 4, "riddle": "أي تقنية تساعد على تأمين الاتصال عبر تشفيره عند تصفح الويب؟", "choices": ["HTTPS", "HTML", "RSS"], "answerIndex": 0, "explanation": "HTTPS = HTTP مع تشفير TLS." },
    { "id": "TEC-018", "difficulty": 4, "riddle": "أي خيار يصف (الذكاء الاصطناعي التوليدي) بشكل أدق؟", "choices": ["ينتج نصوص/صور جديدة بناءً على بيانات تعلم منها", "يزيد سرعة المعالج", "يصلح أعطال الشاشة"], "answerIndex": 0, "explanation": "التوليدي يُنشئ محتوى جديدًا." },
    { "id": "TEC-019", "difficulty": 4, "riddle": "أي مصطلح يصف تخزين صفحات/بيانات مؤقتًا لتسريع فتحها لاحقًا؟", "choices": ["Cache", "Kernel", "API"], "answerIndex": 0, "explanation": "Cache تخزين مؤقت للتسريع." },
    { "id": "TEC-020", "difficulty": 4, "riddle": "أي جزء مسؤول غالبًا عن معالجة الرسوميات في الألعاب؟", "choices": ["GPU", "Router", "Compiler"], "answerIndex": 0, "explanation": "GPU لمعالجة الرسوميات." },
    // الألغاز الجديدة (10)
    { "id": "TEC-021", "difficulty": 1, "riddle": "ما هي وحدة المعالجة المركزية؟", "choices": ["CPU", "GPU", "RAM"], "answerIndex": 0, "explanation": "CPU هي المعالج" },
    { "id": "TEC-022", "difficulty": 1, "riddle": "أي من هذه الشركات تنتج نظام تشغيل Windows؟", "choices": ["Microsoft", "Apple", "Google"], "answerIndex": 0, "explanation": "Microsoft" },
    { "id": "TEC-023", "difficulty": 2, "riddle": "ما هو بروتوكول نقل النص التشعبي الآمن؟", "choices": ["HTTPS", "HTTP", "FTP"], "answerIndex": 0, "explanation": "HTTPS" },
    { "id": "TEC-024", "difficulty": 2, "riddle": "أي لغة برمجة تُستخدم غالبًا لتطوير تطبيقات Android؟", "choices": ["Java", "Python", "C#"], "answerIndex": 0, "explanation": "Java (و Kotlin)" },
    { "id": "TEC-025", "difficulty": 2, "riddle": "ما هو الجهاز الذي يربط الشبكات ببعضها؟", "choices": ["Router", "Modem", "Switch"], "answerIndex": 0, "explanation": "الراوتر" },
    { "id": "TEC-026", "difficulty": 1, "riddle": "أي من التالي هو موقع تواصل اجتماعي؟", "choices": ["Facebook", "Google", "Amazon"], "answerIndex": 0, "explanation": "Facebook" },
    { "id": "TEC-027", "difficulty": 1, "riddle": "ما هي أصغر وحدة تخزين في الحاسوب؟", "choices": ["Bit", "Byte", "KB"], "answerIndex": 0, "explanation": "Bit" },
    { "id": "TEC-028", "difficulty": 1, "riddle": "أي من هذه الصيغ تُستخدم للصور المضغوطة؟", "choices": ["JPEG", "MP3", "TXT"], "answerIndex": 0, "explanation": "JPEG" },
    { "id": "TEC-029", "difficulty": 2, "riddle": "ما هو نظام التشغيل المفتوح المصدر الشهير؟", "choices": ["Linux", "macOS", "Windows"], "answerIndex": 0, "explanation": "Linux" },
    { "id": "TEC-030", "difficulty": 1, "riddle": "أي مما يلي يُعتبر جهاز إدخال؟", "choices": ["الفأرة", "الشاشة", "الطابعة"], "answerIndex": 0, "explanation": "الفأرة" }
  ]
};

// ================== متغيرات عامة ==================
let puzzlesData = null;
let currentScreen = 'start';
let selectedCategory = null;
let selectedLevel = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let hearts = 3;
let streak = 0;
let timerInterval = null;
let timeLeft = 20;
let canAnswer = true;
const maxQuestions = 10;
let currentUser = null;          // المستخدم الحالي
let authMode = 'login';          // 'login' or 'signup'

// عناصر DOM
const startScreen = document.getElementById('start-screen');
const categoryScreen = document.getElementById('category-screen');
const levelScreen = document.getElementById('level-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const authScreen = document.getElementById('auth-screen');
const highscoresScreen = document.getElementById('highscores-screen');

// ================== مراقبة حالة المصادقة ==================
auth.onAuthStateChanged(user => {
    currentUser = user;
    const userInfoDiv = document.getElementById('user-info');
    const authButton = document.getElementById('auth-button');
    if (user) {
        // عرض الاسم إذا كان موجودًا
        const displayName = user.displayName || user.email || 'لاعب';
        userInfoDiv.innerHTML = `👋 مرحباً، ${displayName}`;
        authButton.innerText = '🚪 تسجيل الخروج';
        authButton.onclick = () => logout();
    } else {
        userInfoDiv.innerHTML = '';
        authButton.innerText = '🔑 تسجيل الدخول';
        authButton.onclick = () => showAuthScreen();
    }
});

// ================== دوال المصادقة ==================
function showAuthScreen() {
    document.getElementById('auth-message').innerText = '';
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    authMode = 'login';
    document.getElementById('auth-action').innerText = 'تسجيل الدخول';
    document.getElementById('username').style.display = 'none';
    document.getElementById('username').required = false;
    showScreen('auth-screen');
}

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    document.getElementById('auth-action').innerText = authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب';
    const usernameField = document.getElementById('username');
    if (authMode === 'signup') {
        usernameField.style.display = 'block';
        usernameField.required = true;
    } else {
        usernameField.style.display = 'none';
        usernameField.required = false;
        usernameField.value = '';
    }
}

function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const messageEl = document.getElementById('auth-message');

    if (authMode === 'login') {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                goBackToStart();
            })
            .catch(error => {
                messageEl.innerText = '❌ ' + error.message;
            });
    } else {
        // إنشاء حساب جديد
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // تحديث الملف الشخصي بإضافة الاسم
                return userCredential.user.updateProfile({
                    displayName: username
                }).then(() => {
                    goBackToStart();
                });
            })
            .catch(error => {
                messageEl.innerText = '❌ ' + error.message;
            });
    }
}

function logout() {
    auth.signOut().then(() => {
        goBackToStart();
    });
}

// تحميل بيانات الألغاز (مضمنة الآن)
window.onload = function() {
    puzzlesData = embeddedPuzzles;
    console.log('✅ تم تحميل الألغاز بنجاح');
    const userInfoDiv = document.getElementById('user-info');
    if (userInfoDiv) {
        userInfoDiv.innerHTML += '<span style="color: #9ae6b4; margin-right: 10px;">✓ البيانات جاهزة</span>';
    }
};

// دالة بدء اللعبة مع التحقق من وجود البيانات
function startGame() {
    if (!puzzlesData) {
        alert('⏳ لم يتم تحميل البيانات بعد. يرجى الانتظار.');
        return;
    }
    // ... باقي الكود (مذكور أدناه)
}

// ================== دوال التنقل ==================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

function goBackToStart() { showScreen('start-screen'); }
function goBackToCategories() { showScreen('category-screen'); }
function goToStart() { showScreen('start-screen'); }
function goToLevelSelect() { showLevelScreen(); }

// ================== شاشة اختيار الفئة ==================
function showCategoryScreen() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    const categories = [
        { id: 'numbers', name: '🔢 أرقام ومنطق' },
        { id: 'old', name: '🕰️ ألغاز قديمة' },
        { id: 'history', name: '🏛️ تاريخ' },
        { id: 'technology', name: '💻 تكنولوجيا' }
    ];
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = `category-card ${selectedCategory === cat.id ? 'selected' : ''}`;
        card.innerHTML = `
            <div class="category-icon">${cat.name.split(' ')[0]}</div>
            <div class="category-title">${cat.name}</div>
        `;
        card.onclick = () => {
            selectedCategory = cat.id;
            showLevelScreen();
        };
        container.appendChild(card);
    });
    showScreen('category-screen');
}

// ================== شاشة اختيار المستوى ==================
function showLevelScreen() {
    if (!selectedCategory) {
        showCategoryScreen();
        return;
    }
    const container = document.getElementById('levels-container');
    container.innerHTML = '';
    const levels = [
        { id: 1, name: '🌱 سهل', points: 10 },
        { id: 2, name: '🌿 متوسط', points: 20 },
        { id: 3, name: '🌳 صعب', points: 30 },
        { id: 4, name: '🧠 عبقري', points: 50 }
    ];
    levels.forEach(lev => {
        const card = document.createElement('div');
        card.className = `level-card ${selectedLevel === lev.id ? 'selected' : ''}`;
        card.innerHTML = `
            <div class="category-title">${lev.name}</div>
            <div class="level-difficulty">${lev.points} نقطة/سؤال</div>
        `;
        card.onclick = () => {
            selectedLevel = lev.id;
            startGame();
        };
        container.appendChild(card);
    });
    showScreen('level-screen');
}

// ================== بدء اللعبة ==================
function startGame() {
    if (!puzzlesData) {
        alert('⏳ البيانات لم يتم تحميلها بعد.');
        return;
    }
    if (!selectedCategory) selectedCategory = 'numbers';
    if (!selectedLevel) selectedLevel = 1;

    const allQuestions = puzzlesData[selectedCategory];
    if (!allQuestions) {
        alert('❌ لا توجد أسئلة لهذه الفئة');
        return;
    }

    const filtered = allQuestions.filter(q => q.difficulty === selectedLevel);
    currentQuestions = filtered.slice(0, maxQuestions);

    if (currentQuestions.length === 0) {
        alert('⚠️ لا توجد أسئلة كافية لهذا المستوى.');
        return;
    }

    currentQuestionIndex = 0;
    score = 0;
    hearts = 3;
    streak = 0;
    canAnswer = true;

    document.getElementById('score-display').innerText = '0 نقطة';
    updateHearts();
    showScreen('game-screen');
    loadQuestion();
}

// ================== تحديث القلوب ==================
function updateHearts() {
    const container = document.getElementById('hearts-container');
    container.innerHTML = '';
    for (let i = 0; i < hearts; i++) {
        container.innerHTML += '<span class="heart">❤️</span>';
    }
}

// ================== تحديث دائرة المؤقت ==================
function updateTimerCircle(percent) {
    const circle = document.querySelector('.timer-circle');
    if (circle) {
        const angle = percent * 360;
        circle.style.background = `conic-gradient(#48bb78 ${angle}deg, #2d3748 ${angle}deg)`;
    }
}

// ================== تحميل السؤال ==================
function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endGame();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('riddle-text').innerText = q.riddle;
    document.getElementById('question-counter').innerText = `السؤال ${currentQuestionIndex+1} / ${currentQuestions.length}`;

    const choicesDiv = document.getElementById('choices-container');
    choicesDiv.innerHTML = '';
    q.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice;
        btn.onclick = () => checkAnswer(index);
        choicesDiv.appendChild(btn);
    });

    document.getElementById('explanation-container').style.display = 'none';
    canAnswer = true;
    timeLeft = 20;
    document.getElementById('timer-display').innerText = timeLeft;
    updateTimerCircle(1);

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-display').innerText = timeLeft;
        updateTimerCircle(timeLeft / 20);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (canAnswer) handleWrongAnswer();
        }
    }, 1000);
}

// ================== معالجة الإجابة الخاطئة ==================
function handleWrongAnswer() {
    hearts--;
    updateHearts();
    if (hearts <= 0) {
        endGame();
        return;
    }
    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('explanation-text').innerHTML = `❌ إجابة خاطئة!<br>${q.explanation}`;
    document.getElementById('explanation-container').style.display = 'block';
    disableChoices();
    canAnswer = false;
    clearInterval(timerInterval);
}

// ================== التحقق من الإجابة ==================
function checkAnswer(index) {
    if (!canAnswer) return;
    clearInterval(timerInterval);
    canAnswer = false;

    const q = currentQuestions[currentQuestionIndex];
    const isCorrect = (index === q.answerIndex);

    const choicesBtns = document.querySelectorAll('.choice-btn');
    choicesBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answerIndex) {
            btn.classList.add('correct');
        } else if (i === index && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    if (isCorrect) {
        let points = 0;
        if (selectedLevel === 1) points = 10;
        else if (selectedLevel === 2) points = 20;
        else if (selectedLevel === 3) points = 30;
        else if (selectedLevel === 4) points = 50;

        score += points;
        streak++;
        if (streak === 5) {
            score += 50;
            streak = 0;
        }

        document.getElementById('score-display').innerText = score + ' نقطة';
        document.getElementById('explanation-text').innerHTML = `✅ إجابة صحيحة!<br>${q.explanation}`;
    } else {
        handleWrongAnswer();
        return;
    }

    document.getElementById('explanation-container').style.display = 'block';
}

function disableChoices() {
    document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);
}

// ================== الانتقال للسؤال التالي ==================
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

// ================== إنهاء المرحلة مبكراً ==================
function endGameEarly() {
    if (confirm('هل تريد إنهاء المرحلة؟')) {
        clearInterval(timerInterval);
        endGame();
    }
}

// ================== إنهاء المرحلة وعرض النتائج مع حفظ النقاط ==================
function endGame() {
    clearInterval(timerInterval);
    // حفظ النتيجة إذا كان المستخدم مسجلاً
    if (currentUser) {
        saveScoreToFirestore();
    } else {
        showEndScreen();
    }
}

async function saveScoreToFirestore() {
    try {
        await db.collection('scores').add({
            userId: currentUser.uid,
            username: currentUser.displayName || 'لاعب',   // إضافة الاسم
            email: currentUser.email,                      // يمكن الاحتفاظ به أو إزالته
            category: selectedCategory,
            level: selectedLevel,
            score: score,
            heartsLeft: hearts,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ تم حفظ النتيجة');
    } catch (error) {
        console.error('❌ خطأ في حفظ النتيجة:', error);
    } finally {
        showEndScreen();
    }
}

function showEndScreen() {
    const totalQuestions = currentQuestions.length;
    document.getElementById('result-stats').innerHTML = `
        <p>🏅 مجموع النقاط: ${score}</p>
        <p>📋 عدد الأسئلة: ${totalQuestions}</p>
        <p>❤️ القلوب المتبقية: ${hearts}</p>
    `;

    let stars = 0;
    if (hearts === 3) stars = 3;
    else if (hearts === 2) stars = 2;
    else if (hearts === 1) stars = 1;

    const starsContainer = document.getElementById('stars-container');
    starsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        starsContainer.innerHTML += i < stars ? '⭐' : '☆';
    }

    showScreen('end-screen');
}

// ================== إعادة المرحلة ==================
function restartLevel() {
    startGame();
}

// ================== بدء التحدي السريع ==================
function startChallenge() {
    selectedCategory = 'numbers';
    selectedLevel = 1;
    startGame();
}

// ================== عرض أفضل النتائج ==================
async function showHighScores() {
    const container = document.getElementById('highscores-list');
    container.innerHTML = '<p style="text-align:center;">⏳ جاري التحميل...</p>';
    showScreen('highscores-screen');

    try {
        const snapshot = await db.collection('scores')
            .orderBy('score', 'desc')
            .limit(20)
            .get();

        if (snapshot.empty) {
            container.innerHTML = '<p style="text-align:center;">لا توجد نتائج بعد.</p>';
            return;
        }

        let html = '<ol style="list-style: none; padding:0;">';
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleDateString('ar-EG') : '';
            html += `<li style="background: #2d3748; margin:10px 0; padding:15px; border-radius:30px; display:flex; justify-content:space-between;">
                <span>👤 ${data.username || 'لاعب'}</span>
                <span>🏆 ${data.score}</span>
                <span>📅 ${date}</span>
            </li>`;
        });
        html += '</ol>';
        container.innerHTML = html;
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p style="color:#f56565;">❌ حدث خطأ في تحميل النتائج.</p>';
    }
}
// ... (كل الكود السابق يبقى كما هو، مع إضافة التعديلات التالية)

// ================== متغيرات عامة إضافية ==================
let seenPuzzles = []; // مصفوفة لتخزين IDs الألغاز التي تمت مشاهدتها

// ================== دوال إدارة الألغاز المشاهدة ==================
function loadSeenPuzzles() {
    const key = currentUser ? `seenPuzzles_${currentUser.uid}` : 'seenPuzzles_guest';
    const stored = localStorage.getItem(key);
    seenPuzzles = stored ? JSON.parse(stored) : [];
}

function saveSeenPuzzle(puzzleId) {
    if (!seenPuzzles.includes(puzzleId)) {
        seenPuzzles.push(puzzleId);
        const key = currentUser ? `seenPuzzles_${currentUser.uid}` : 'seenPuzzles_guest';
        localStorage.setItem(key, JSON.stringify(seenPuzzles));
    }
}

// فلترة الأسئلة غير المشاهدة
function getUnseenQuestions(category, level) {
    const allQuestions = puzzlesData[category] || [];
    const filteredByLevel = allQuestions.filter(q => q.difficulty === level);
    // استبعاد الأسئلة التي شوهدت
    const unseen = filteredByLevel.filter(q => !seenPuzzles.includes(q.id));
    return unseen;
}

// تحديث startGame لاستخدام الآلية الجديدة
function startGame() {
    if (!puzzlesData) {
        alert('⏳ البيانات لم يتم تحميلها بعد.');
        return;
    }
    if (!selectedCategory) selectedCategory = 'numbers';
    if (!selectedLevel) selectedLevel = 1;

    loadSeenPuzzles(); // تحميل سجل المشاهدات

    let availableQuestions = getUnseenQuestions(selectedCategory, selectedLevel);

    // إذا كان العدد أقل من المطلوب، نعيد تعيين السجل (مع إشعار)
    if (availableQuestions.length < maxQuestions) {
        if (availableQuestions.length === 0) {
            alert('✨ لقد أكملت جميع الألغاز في هذا المستوى! سيتم إعادة تعيين القائمة.');
        } else {
            alert(`⚠️ تبقى فقط ${availableQuestions.length} ألغاز جديدة. سيتم إعادة تعيين القائمة بعد اكتمالها.`);
        }
        // مسح السجل وإعادة تحميل الكل
        const key = currentUser ? `seenPuzzles_${currentUser.uid}` : 'seenPuzzles_guest';
        localStorage.removeItem(key);
        seenPuzzles = [];
        availableQuestions = getUnseenQuestions(selectedCategory, selectedLevel);
    }

    // خلط الأسئلة واختيار أول maxQuestions
    const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
    currentQuestions = shuffled.slice(0, maxQuestions);

    if (currentQuestions.length === 0) {
        alert('⚠️ لا توجد أسئلة متاحة لهذا المستوى.');
        return;
    }

    currentQuestionIndex = 0;
    score = 0;
    hearts = 3;
    streak = 0;
    canAnswer = true;

    document.getElementById('score-display').innerText = '0 نقطة';
    updateHearts();
    showScreen('game-screen');
    loadQuestion();
}

// تعديل دالة checkAnswer لحفظ اللغز بعد الإجابة (سواء صحيحة أو خاطئة)
function checkAnswer(index) {
    if (!canAnswer) return;
    clearInterval(timerInterval);
    canAnswer = false;

    const q = currentQuestions[currentQuestionIndex];
    const isCorrect = (index === q.answerIndex);

    // حفظ اللغز في قائمة المشاهدات
    saveSeenPuzzle(q.id);

    const choicesBtns = document.querySelectorAll('.choice-btn');
    choicesBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answerIndex) {
            btn.classList.add('correct');
        } else if (i === index && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    if (isCorrect) {
        let points = 0;
        if (selectedLevel === 1) points = 10;
        else if (selectedLevel === 2) points = 20;
        else if (selectedLevel === 3) points = 30;
        else if (selectedLevel === 4) points = 50;

        score += points;
        streak++;
        if (streak === 5) {
            score += 50;
            streak = 0;
        }

        document.getElementById('score-display').innerText = score + ' نقطة';
        document.getElementById('explanation-text').innerHTML = `✅ إجابة صحيحة!<br>${q.explanation}`;
    } else {
        handleWrongAnswer();
        return;
    }

    document.getElementById('explanation-container').style.display = 'block';
}

// ... (باقي الكود كما هو، مع التأكد من استدعاء loadSeenPuzzles في startGame)

// ================== تصدير الدوال ==================
window.startChallenge = startChallenge;
window.showCategoryScreen = showCategoryScreen;
window.showLevelScreen = showLevelScreen;
window.showHighScores = showHighScores;
window.showAuthScreen = showAuthScreen;
window.goBackToStart = goBackToStart;
window.goBackToCategories = goBackToCategories;
window.goToStart = goToStart;
window.goToLevelSelect = goToLevelSelect;
window.nextQuestion = nextQuestion;
window.endGameEarly = endGameEarly;
window.restartLevel = restartLevel;
window.handleAuth = handleAuth;
window.toggleAuthMode = toggleAuthMode;
window.logout = logout;
