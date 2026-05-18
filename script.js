const movementData = {
    slidehopping: {
        title: "Slide Hopping",
        difficulty: "Beginner",
        intro: "Slide hopping is a core Titanfall 2 movement technique used to preserve speed while moving across the ground.",
        keys: "Sprint forward, crouch into a slide before landing, then jump as soon as you touch the ground. Repeat the slide and jump timing.",
        principle: "Sliding reduces ground speed loss, and jumping quickly carries forward momentum into the next hop.",
        use: "Use slide hopping to rotate faster, cross open space, and keep speed after landing from walls or jumps.",
        video: "slidehopping.mp4",
        practice: [
            "Start with a sprint and a normal slide.",
            "Jump as soon as the slide touches the ground.",
            "Press crouch again before the next landing.",
            "Repeat the timing slowly before trying to go faster.",
            "Focus on rhythm instead of spamming inputs."
        ]
    },

    wallkick: {
        title: "Wall Kick",
        difficulty: "Beginner",
        intro: "Wall kick is a quick wall-contact jump that sends the pilot away from the wall while keeping momentum.",
        keys: "Approach a wall at speed, touch the wall briefly, then press jump almost immediately after contact.",
        principle: "The first moment of wall contact can redirect momentum. A fast jump creates a kick away from the wall without staying in a long wall run.",
        use: "Use wall kicks to start routes quickly, redirect off walls, and keep movement fast in tight spaces.",
        video: "wallkick.mp4",
        practice: [
            "Approach a flat wall at a shallow angle.",
            "Touch the wall only briefly.",
            "Jump immediately after contact.",
            "Aim away from the wall to continue the route.",
            "Practice clean timing before trying maximum speed."
        ]
    },

    crouchkick: {
        title: "Crouch Kick",
        difficulty: "Intermediate",
        intro: "Crouch kick is a stronger wall-contact movement that combines crouch timing with jump timing.",
        keys: "Touch a wall at speed, then press crouch and jump together around the wall contact timing.",
        principle: "The crouch input changes the wall-contact interaction, while the jump input kicks the pilot away from the wall. Correct timing creates a stronger redirect.",
        use: "Use crouch kicks when a normal wall kick is not enough or when a route needs a stronger wall boost.",
        video: "crouchkick.mp4",
        practice: [
            "Practice regular wall kicks first.",
            "Approach the wall with stable speed.",
            "Press crouch and jump together on wall contact.",
            "Look for a stronger push away from the wall.",
            "Keep the timing controlled instead of rushing."
        ]
    },

    tapstrafe: {
        title: "Tap Strafe",
        difficulty: "Beginner",
        intro: "Tap strafe is a lurch-based redirect that uses repeated forward inputs to create a sharper mid-air turn.",
        keys: "After a slide jump, hold a side direction such as A or D, turn your view smoothly, and tap the forward input several times during the lurch window.",
        principle: "Each forward input slightly changes the movement vector. Several quick inputs stack together to make the turn sharper while keeping momentum.",
        use: "Use tap strafing for tight corners, fast route changes, and sharp direction changes after slide hops or jumps.",
        video: "tapstrafe.mp4",
        practice: [
            "Begin with a clean slide jump.",
            "Choose a turning direction with A or D.",
            "Tap forward several times shortly after jumping.",
            "Turn your camera smoothly in the same direction.",
            "Start with small turns before attempting sharp turns."
        ]
    },

    rasstrafe: {
        title: "Ras Strafe",
        difficulty: "Advanced",
        intro: "Ras strafe is an advanced lurch-combo style direction change using chained directional inputs.",
        keys: "After a jump, chain directional inputs to redirect momentum through a curved path. The focus is keyboard timing and controlled camera movement.",
        principle: "Ras strafe uses stacked lurch inputs to redirect momentum in multiple directions. It is more about timed directional order than normal air strafing.",
        use: "Use Ras strafing for sharp evasive movement, advanced direction changes, and movement demonstrations.",
        video: "rasstrafe.mp4",
        practice: [
            "Start from a slide jump with stable speed.",
            "Practice one lurch direction first.",
            "Add a second directional input after the first redirect.",
            "Keep your camera movement controlled.",
            "Build the sequence slowly before using it at full speed."
        ]
    },

    lurchstrafe: {
        title: "Lurch Strafe",
        difficulty: "Advanced",
        intro: "Lurch strafe uses timed digital directional inputs shortly after jumping to redirect movement in the air.",
        keys: "After jumping, use quick A, D, W, or S inputs during the short lurch window while controlling your camera smoothly.",
        principle: "Titanfall 2 gives a short post-jump window where directional inputs can pull the player's movement direction. Strong timing creates sharp aerial control.",
        use: "Use lurch strafes to correct your path, make sharper turns, and connect movement routes without needing a long wall setup.",
        video: "lurchstrafe.mp4",
        practice: [
            "Jump from a clean slide hop.",
            "Press one directional key shortly after the jump.",
            "Watch how your path redirects in the air.",
            "Add smooth mouse movement after the keyboard timing feels consistent.",
            "Practice small redirects before large turns."
        ]
    }
};

function scrollToTechniques() {
    const section = document.getElementById("techniques");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}

const checkboxes = document.querySelectorAll("input[type='checkbox']");
const progressText = document.getElementById("progressText");

checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", updateProgress);
});

function updateProgress() {
    let completed = 0;

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            completed++;
        }
    });

    if (progressText) {
        progressText.textContent =
            "Progress: " + completed + " / " + checkboxes.length + " completed";
    }
}

function loadTechniqueDetail() {
    const params = new URLSearchParams(window.location.search);
    let technique = params.get("technique");

    if (!technique) {
        technique = "slidehopping";
    }

    const data = movementData[technique];

    if (!data) {
        return;
    }

    const title = document.getElementById("detailTitle");
    const difficulty = document.getElementById("detailDifficulty");
    const intro = document.getElementById("detailIntro");
    const keys = document.getElementById("detailKeys");
    const principle = document.getElementById("detailPrinciple");
    const use = document.getElementById("detailUse");
    const practiceList = document.getElementById("detailPractice");

    if (title) {
        title.textContent = data.title;
    }

    if (difficulty) {
        difficulty.textContent = data.difficulty + " Movement";
    }

    if (intro) {
        intro.textContent = data.intro;
    }

    if (keys) {
        keys.textContent = data.keys;
    }

    if (principle) {
        principle.textContent = data.principle;
    }

    if (use) {
        use.textContent = data.use;
    }

    if (practiceList) {
        practiceList.innerHTML = "";

        data.practice.forEach(function(step) {
            const li = document.createElement("li");
            li.textContent = step;
            practiceList.appendChild(li);
        });
    }

    const video = document.getElementById("movementVideo");
    const videoSource = document.getElementById("videoSource");

    if (video && videoSource) {
        videoSource.src = data.video;
        video.load();
    }
}

function goBackHome() {
    window.location.href = "index.html#techniques";
}

function showRandomTip() {
    const tips = [
        "Practice one technique slowly before combining it with others.",
        "Clean timing matters more than speed at first.",
        "Keep camera movement smooth when learning redirects.",
        "Use small turns before trying full sharp direction changes.",
        "Record a short clip and compare your timing with the guide."
    ];

    const randomIndex = Math.floor(Math.random() * tips.length);
    const tipBox = document.getElementById("randomTip");

    if (tipBox) {
        tipBox.textContent = tips[randomIndex];
    }
}

if (document.getElementById("detailTitle")) {
    loadTechniqueDetail();
}
