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

function setupChecklistListeners() {
    const checkboxes = document.querySelectorAll("#practiceChecklist input[type='checkbox']");

    checkboxes.forEach(function(checkbox) {
        checkbox.removeEventListener("change", updateProgress);
        checkbox.addEventListener("change", function() {
            updateProgress();

            const checklistSort = document.getElementById("checklistSort");

            if (checklistSort && (checklistSort.value === "completed" || checklistSort.value === "incomplete")) {
                sortChecklist();
            }
        });
    });

    updateProgress();
}

function getPracticeWeight(difficulty) {
    if (difficulty === "beginner") {
        return 1;
    }

    if (difficulty === "intermediate") {
        return 2;
    }

    if (difficulty === "advanced") {
        return 3;
    }

    return 1;
}

function getPlayerLevel(percent) {
    if (percent >= 85) {
        return "Player Level: Master Pilot";
    }

    if (percent >= 65) {
        return "Player Level: Advanced Pilot";
    }

    if (percent >= 40) {
        return "Player Level: Intermediate Pilot";
    }

    return "Player Level: Beginner Pilot";
}

function updateProgress() {
    const rows = document.querySelectorAll("#practiceChecklist .practice-row");
    const progressText = document.getElementById("progressText");
    const scoreText = document.getElementById("scoreText");
    const levelText = document.getElementById("levelText");

    let completed = 0;
    let total = rows.length;
    let earnedScore = 0;
    let totalScore = 0;

    rows.forEach(function(row) {
        const difficulty = row.dataset.difficulty || "beginner";
        const weight = getPracticeWeight(difficulty);
        const checkbox = row.querySelector("input[type='checkbox']");

        totalScore += weight;

        if (checkbox && checkbox.checked) {
            completed++;
            earnedScore += weight;
        }
    });

    const percent = totalScore > 0 ? Math.round((earnedScore / totalScore) * 100) : 0;

    if (progressText) {
        progressText.textContent = "Progress: " + completed + " / " + total + " completed";
    }

    if (scoreText) {
        scoreText.textContent = "Score: " + earnedScore + " / " + totalScore + " (" + percent + "%)";
    }

    if (levelText) {
        levelText.textContent = getPlayerLevel(percent);
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



// ---------- Online editor and search features ----------

function getCustomTechniques() {
    const saved = localStorage.getItem("customTechniques");

    if (!saved) {
        return [];
    }

    return JSON.parse(saved);
}

function saveCustomTechniques(techniques) {
    localStorage.setItem("customTechniques", JSON.stringify(techniques));
}

function openVideoDatabase() {
    return new Promise(function(resolve, reject) {
        const request = indexedDB.open("movementVideoDatabase", 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;

            if (!db.objectStoreNames.contains("videos")) {
                db.createObjectStore("videos");
            }
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function() {
            reject(request.error);
        };
    });
}

async function saveVideoFile(videoId, file) {
    if (!file) {
        return;
    }

    const db = await openVideoDatabase();

    return new Promise(function(resolve, reject) {
        const transaction = db.transaction("videos", "readwrite");
        const store = transaction.objectStore("videos");
        store.put(file, videoId);

        transaction.oncomplete = function() {
            resolve();
        };

        transaction.onerror = function() {
            reject(transaction.error);
        };
    });
}

async function loadVideoFile(videoId) {
    const db = await openVideoDatabase();

    return new Promise(function(resolve, reject) {
        const transaction = db.transaction("videos", "readonly");
        const store = transaction.objectStore("videos");
        const request = store.get(videoId);

        request.onsuccess = function() {
            resolve(request.result);
        };

        request.onerror = function() {
            reject(request.error);
        };
    });
}


function renderCustomChecklistItems() {
    const checklist = document.getElementById("practiceChecklist");

    if (!checklist) {
        return;
    }

    const oldCustomItems = document.querySelectorAll(".custom-practice-row");
    oldCustomItems.forEach(function(item) {
        item.remove();
    });

    const customTechniques = getCustomTechniques();

    customTechniques.forEach(function(technique) {
        const row = document.createElement("div");
        const difficultyClass = technique.difficulty.toLowerCase();

        row.className = "practice-row custom-practice-row";
        row.dataset.source = "custom";
        row.dataset.difficulty = difficultyClass;
        row.dataset.name = technique.title;
        row.dataset.order = checklist.children.length + 1;

        const difficultyBadge = document.createElement("span");
        difficultyBadge.className = "difficulty-badge " + difficultyClass + "-badge";
        difficultyBadge.textContent = technique.difficulty;

        const number = document.createElement("span");
        number.className = "practice-number";
        number.textContent = checklist.children.length + 1;

        const name = document.createElement("a");
        name.className = "practice-name";
        name.href = "detail.html?technique=" + technique.id;
        name.textContent = technique.title;

        const standard = document.createElement("span");
        standard.className = "practice-standard";
        standard.textContent = technique.standard || "Complete this custom technique consistently.";

        const checkLabel = document.createElement("label");
        checkLabel.className = "practice-check";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-practice-custom";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function(event) {
            event.preventDefault();
            deleteCustomTechnique(technique.id);
        });

        checkLabel.appendChild(checkbox);
        checkLabel.appendChild(deleteButton);

        row.appendChild(difficultyBadge);
        row.appendChild(number);
        row.appendChild(name);
        row.appendChild(standard);
        row.appendChild(checkLabel);

        checklist.appendChild(row);
    });

    renumberPracticeRows();
    setupChecklistListeners();
setupChecklistSort();
    setupChecklistSort();
}

function renumberPracticeRows() {
    const numbers = document.querySelectorAll("#practiceChecklist .practice-number");

    numbers.forEach(function(number, index) {
        number.textContent = index + 1;
    });
}


function renderCustomTechniqueCards() {
    const container = document.getElementById("techniqueCards");

    if (!container) {
        return;
    }

    const oldCustomCards = document.querySelectorAll(".custom-card-wrapper");
    oldCustomCards.forEach(function(card) {
        card.remove();
    });

    const customTechniques = getCustomTechniques();

    customTechniques.forEach(function(technique) {
const wrapper = document.createElement("div");
        wrapper.className = "custom-card-wrapper";

        const card = document.createElement("a");
        card.className = "card " + technique.difficulty.toLowerCase();
        card.href = "detail.html?technique=" + technique.id;
        card.dataset.name = technique.title;
        card.dataset.difficulty = technique.difficulty.toLowerCase();
        card.dataset.source = "custom";

        card.innerHTML =
            "<h3>" + technique.title + "</h3>" +
            "<span>" + technique.difficulty + "</span>" +
            "<span class='custom-tag'>Custom</span>";

        wrapper.appendChild(card);
        container.appendChild(wrapper);
    });
}

function setupControls() {
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const filterSelect = document.getElementById("filterSelect");

    if (!searchInput || !sortSelect || !filterSelect) {
        return;
    }

    searchInput.addEventListener("input", updateTechniqueDisplay);
    sortSelect.addEventListener("change", updateTechniqueDisplay);
    filterSelect.addEventListener("change", updateTechniqueDisplay);

    updateTechniqueDisplay();
}

function updateTechniqueDisplay() {
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const filterSelect = document.getElementById("filterSelect");
    const container = document.getElementById("techniqueCards");

    if (!searchInput || !sortSelect || !filterSelect || !container) {
        return;
    }

    const searchText = searchInput.value.toLowerCase();
    const sortMode = sortSelect.value;
    const filterMode = filterSelect.value;

    const cards = Array.from(container.children);

    cards.forEach(function(item) {
        const card = item.classList.contains("card") ? item : item.querySelector(".card");

        if (!card) {
            item.style.display = "none";
            return;
        }

        const name = (card.dataset.name || card.textContent).toLowerCase();
        const source = card.dataset.source || "default";

        const matchesSearch = name.includes(searchText);
        const matchesFilter =
            filterMode === "all" ||
            filterMode === source;

        if (matchesSearch && matchesFilter) {
            item.style.display = "";
        }
        else {
            item.style.display = "none";
        }
    });

    cards.sort(function(a, b) {
        const cardA = a.classList.contains("card") ? a : a.querySelector(".card");
        const cardB = b.classList.contains("card") ? b : b.querySelector(".card");

        if (!cardA || !cardB) {
            return 0;
        }

        const nameA = cardA.dataset.name || "";
        const nameB = cardB.dataset.name || "";
        const diffA = getDifficultyValue(cardA.dataset.difficulty || "");
        const diffB = getDifficultyValue(cardB.dataset.difficulty || "");

        if (sortMode === "difficulty-low") {
            return diffA - diffB || nameA.localeCompare(nameB);
        }

        if (sortMode === "difficulty-high") {
            return diffB - diffA || nameA.localeCompare(nameB);
        }

        if (sortMode === "alpha") {
            return nameA.localeCompare(nameB);
        }

        return 0;
    });

    cards.forEach(function(item) {
        container.appendChild(item);
    });
}

function setupTechniqueForm() {
    const form = document.getElementById("techniqueForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const title = document.getElementById("newTitle").value.trim();
        const difficulty = document.getElementById("newDifficulty").value || "Beginner";
        const intro = document.getElementById("newIntro").value.trim() || "No introduction added yet.";
        const keys = document.getElementById("newKeys").value.trim() || "No input information added yet.";
        const principle = document.getElementById("newPrinciple").value.trim() || "No movement principle added yet.";
        const use = document.getElementById("newUse").value.trim() || "No gameplay use added yet.";
        const practiceText = document.getElementById("newPractice").value.trim();
        const standard = document.getElementById("newStandard").value.trim() || "Complete this technique consistently.";
        const videoFile = document.getElementById("newVideo").files[0];

        const id = "custom-" + Date.now();
        const videoId = id + "-video";

        const newTechnique = {
            id: id,
            title: title,
            difficulty: difficulty,
            intro: intro,
            keys: keys,
            principle: principle,
            use: use,
            practice: practiceText.split("\\n"),
            videoId: videoId
        };

        const customTechniques = getCustomTechniques();
        customTechniques.push(newTechnique);
        saveCustomTechniques(customTechniques);

        if (videoFile) {
            await saveVideoFile(videoId, videoFile);
        }

        document.getElementById("saveMessage").textContent =
            "Saved! Your new technique was added.";

        const batchMode = document.getElementById("batchMode").checked;

        form.reset();

        if (batchMode) {
            document.getElementById("batchMode").checked = true;
        }

        
function setupChecklistSort() {
    const checklistSort = document.getElementById("checklistSort");

    if (!checklistSort) {
        return;
    }

    checklistSort.removeEventListener("change", sortChecklist);
    checklistSort.addEventListener("change", sortChecklist);
}

function sortChecklist() {
    const checklist = document.getElementById("practiceChecklist");
    const checklistSort = document.getElementById("checklistSort");

    if (!checklist || !checklistSort) {
        return;
    }

    const mode = checklistSort.value;
    const rows = Array.from(checklist.querySelectorAll(".practice-row"));

    rows.sort(function(a, b) {
        const nameA = a.dataset.name || "";
        const nameB = b.dataset.name || "";
        const diffA = getPracticeWeight(a.dataset.difficulty || "beginner");
        const diffB = getPracticeWeight(b.dataset.difficulty || "beginner");
        const orderA = Number(a.dataset.order || 0);
        const orderB = Number(b.dataset.order || 0);
        const boxA = a.querySelector("input[type='checkbox']");
        const boxB = b.querySelector("input[type='checkbox']");
        const checkedA = boxA && boxA.checked ? 1 : 0;
        const checkedB = boxB && boxB.checked ? 1 : 0;

        if (mode === "difficulty-low") {
            return diffA - diffB || nameA.localeCompare(nameB);
        }

        if (mode === "difficulty-high") {
            return diffB - diffA || nameA.localeCompare(nameB);
        }

        if (mode === "alpha") {
            return nameA.localeCompare(nameB);
        }

        if (mode === "completed") {
            return checkedB - checkedA || orderA - orderB;
        }

        if (mode === "incomplete") {
            return checkedA - checkedB || orderA - orderB;
        }

        return orderA - orderB;
    });

    rows.forEach(function(row) {
        checklist.appendChild(row);
    });

    renumberPracticeRows();
    updateProgress();
}

renderCustomTechniqueCards();
        renderCustomChecklistItems();
        sortChecklist();
        updateTechniqueDisplay();

        if (!batchMode) {
            closeEditorModal();
            window.location.href = "index.html#techniques";
        }
    });
}

async function loadCustomTechniqueDetail() {
    const params = new URLSearchParams(window.location.search);
    const techniqueId = params.get("technique");

    if (!techniqueId || !techniqueId.startsWith("custom-")) {
        return false;
    }

    const customTechniques = getCustomTechniques();
    const data = customTechniques.find(function(item) {
        return item.id === techniqueId;
    });

    if (!data) {
        return false;
    }

    document.getElementById("detailTitle").textContent = data.title;
    document.getElementById("detailDifficulty").textContent = data.difficulty + " Movement";
    document.getElementById("detailIntro").textContent = data.intro;
    document.getElementById("detailKeys").textContent = data.keys;
    document.getElementById("detailPrinciple").textContent = data.principle;
    document.getElementById("detailUse").textContent = data.use;

    const practiceList = document.getElementById("detailPractice");
    practiceList.innerHTML = "";

    data.practice.forEach(function(step) {
        const li = document.createElement("li");
        li.textContent = step;
        practiceList.appendChild(li);
    });

    const video = document.getElementById("movementVideo");
    const videoSource = document.getElementById("videoSource");

    if (video && videoSource && data.videoId) {
        const videoFile = await loadVideoFile(data.videoId);

        if (videoFile) {
            videoSource.src = URL.createObjectURL(videoFile);
            video.load();
        }
    }


    const actions = document.querySelector(".detail-actions");

    if (actions && !document.getElementById("deleteCustomButton")) {
        const deleteButton = document.createElement("button");
        deleteButton.id = "deleteCustomButton";
        deleteButton.className = "delete-detail-button";
        deleteButton.textContent = "Delete This Custom Technique";

        deleteButton.addEventListener("click", function() {
            deleteCustomTechnique(data.id);
            window.location.href = "index.html#techniques";
        });

        actions.appendChild(deleteButton);
    }

    return true;
}

async function startDetailPage() {
    if (!document.getElementById("detailTitle")) {
        return;
    }

    const loadedCustom = await loadCustomTechniqueDetail();

    if (!loadedCustom) {
        loadTechniqueDetail();
    }
}


function deleteCustomTechnique(id) {
    const customTechniques = getCustomTechniques();
    const updatedTechniques = customTechniques.filter(function(technique) {
        return technique.id !== id;
    });

    saveCustomTechniques(updatedTechniques);
    renderCustomTechniqueCards();
    renderCustomChecklistItems();
    updateTechniqueDisplay();
    updateProgress();

    const saveMessage = document.getElementById("saveMessage");

    if (saveMessage) {
        saveMessage.textContent = "Deleted custom technique.";
    }
}

function openEditorModal() {
    const modal = document.getElementById("editorModal");

    if (modal) {
        modal.style.display = "block";
    }
}

function closeEditorModal() {
    const modal = document.getElementById("editorModal");

    if (modal) {
        modal.style.display = "none";
    }
}

function handleEditorOutsideClick(event) {
    const modal = document.getElementById("editorModal");

    if (modal && event.target === modal) {
        closeEditorModal();
        window.location.href = "index.html#techniques";
    }
}

document.addEventListener("pointerdown", handleEditorOutsideClick);




renderCustomTechniqueCards();
renderCustomChecklistItems();
renumberPracticeRows();
setupChecklistListeners();
setupControls();
updateTechniqueDisplay();
setupTechniqueForm();
startDetailPage();
