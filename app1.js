// SELECT ALL TOOL BOXES for 6 boxes
const toolBoxes = document.querySelectorAll('.tool-box');

// LOOP THROUGH EACH BOX
toolBoxes.forEach(box => {

    box.addEventListener('click', () => {

        // REMOVE ACTIVE FROM ALL BOXES
        toolBoxes.forEach(b => b.classList.remove('active'));

        // ADD ACTIVE TO CLICKED BOX
        box.classList.add('active');

        // OPTIONAL: GET TOOL NAME
        const toolName = box.textContent.trim();
        console.log('Clicked:', toolName);

        // 🔽 PLACE FUTURE ACTION HERE
        // example: open page, filter content, etc.

    });

});
// only for 2 boxes light and dark mode with 
const lightBox = document.querySelector(".light-box");
const darkBox  = document.querySelector(".dark-box");

function setLight() {
    document.body.classList.remove("dark");
    lightBox.classList.add("active");
    darkBox.classList.remove("active");
}

function setDark() {
    document.body.classList.add("dark");
    darkBox.classList.add("active");
    lightBox.classList.remove("active");
}

/* DEFAULT MODE */
setLight();

// for sign up and contact us \\
// SIGN UP FORM SUBMIT
const signupBtn = document.querySelector('.signup-form .btn');

signupBtn.addEventListener('click', () => {
    // You can later add real form validation here
    alert('Sign Up form submitted!');
});

// CONTACT US FORM SUBMIT
const contactBtn = document.querySelector('.contact-form .btn');

contactBtn.addEventListener('click', () => {
    // You can later add real form validation here
    alert('Contact Us form submitted!');
});

/* ============================= */
/* TRIM BUTTON */
/* ============================= */

function trimVideo() {
  const start = parseFloat(startRange.value);
  const end = parseFloat(endRange.value);

  if (start >= end) {
    alert("Start time must be less than end time");
    return;
  }

  video.currentTime = start;
  video.play();

  const stopAtEnd = () => {
    if (video.currentTime >= end) {
      video.pause();
      video.removeEventListener("timeupdate", stopAtEnd);
    }
  };

  video.addEventListener("timeupdate", stopAtEnd);
}

/* ============================= */
/* SPLIT BUTTON */
/* ============================= */

function splitVideo() {
  const time = video.currentTime.toFixed(2);
  alert("Video split at " + time + " seconds (logic ready)");
}

/* ============================= */
/* TOOL BUTTON HANDLER */
/* ============================= */

document.querySelectorAll(".tool-box").forEach(btn => {
  btn.addEventListener("click", () => {
    const tool = btn.innerText.trim();

    if (tool === "Trim") trimVideo();
    if (tool === "Split") splitVideo();
  });
});

/* ============================= */
/* PLAYHEAD FOLLOW VIDEO */
/* ============================= */

video.addEventListener("timeupdate", () => {
  if (!video.duration) return;
  const percent = (video.currentTime / video.duration) * 100;
  playhead.style.left = percent + "%";
});

/* ============================= */
/* DRAGGABLE PLAYHEAD */
/* ============================= */

let dragging = false;

playhead.addEventListener("mousedown", () => dragging = true);
document.addEventListener("mouseup", () => dragging = false);

timeline.addEventListener("mousemove", e => {
  if (!dragging || !video.duration) return;

  const rect = timeline.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  video.currentTime = percent * video.duration;
});

// 5566yyyuuhhjkjhjjjhhjkjjjjjjjj

let audioRecorder;
let audioChunks = [];

/* VIDEO TO AUDIO */
async function videoToAudio() {
  if (!video.src) {
    alert("Please upload a video first");
    return;
  }

  audioChunks = [];

  const stream = video.captureStream();
  const audioStream = new MediaStream(stream.getAudioTracks());

  audioRecorder = new MediaRecorder(audioStream);

  audioRecorder.ondataavailable = e => {
    if (e.data.size > 0) audioChunks.push(e.data);
  };

  audioRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
    const audioURL = URL.createObjectURL(audioBlob);

    const a = document.createElement("a");
    a.href = audioURL;
    a.download = "audio.mp3";
    a.click();
  };

  video.currentTime = 0;
  video.play();
  audioRecorder.start();

  video.onended = () => {
    audioRecorder.stop();
    video.pause();
  };
}

/* TOOL BUTTON HANDLER */
document.querySelectorAll(".tool-box").forEach(btn => {
  btn.addEventListener("click", () => {
    const tool = btn.innerText.trim();

    if (tool === "Video to Audio") videoToAudio();
  });
});