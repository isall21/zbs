"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  BriefcaseBusiness,
  Camera,
  Dna,
  Sparkles,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import sampleBackground from "./images/background.jpeg";
import creatorAvatar from "./images/avatar/the beauty creator.jpeg";
import beautypreneurAvatar from "./images/avatar/the beauty prener.jpeg";
import connectorAvatar from "./images/avatar/the business connector.jpeg";
import educatorAvatar from "./images/avatar/the educator.jpeg";

const CONFIG = {
  eventName: "Munas IMA UMKM & Tourism Award",
  hashtag: "#BeautyDNA",
  tagHandles: "",
  contactUrl: "",
};

const ORDER = ["creator", "beautypreneur", "educator", "connector"];
const AVATARS = {
  creator: creatorAvatar,
  beautypreneur: beautypreneurAvatar,
  educator: educatorAvatar,
  connector: connectorAvatar,
};

const PROFILES = {
  creator: {
    emoji: "💄",
    name: "The Beauty Creator",
    color: "#C2307E",
    tagline: "Kamu hidup lewat kreativitas dan detail.",
    strengths: [
      "Mata tajam untuk estetika dan tren",
      "Senang bereksperimen hal baru",
      "Mengubah ide menjadi karya nyata",
    ],
    next: [
      "Asah teknik dan kumpulkan portofolio karyamu",
      "Tanyakan ke tim booth tentang pelatihan ZBS",
    ],
    ctaTitle: "Ngobrol soal pelatihan ZBS",
    ctaText:
      "Tim booth siap menjelaskan program pelatihan ZBS yang bisa kamu ikuti.",
  },
  beautypreneur: {
    emoji: "🚀",
    name: "The Beautypreneur",
    color: "#D9822B",
    tagline: "Kamu melihat peluang di balik setiap tren.",
    strengths: [
      "Berpikir tentang peluang dan hasil",
      "Berani mengambil langkah pertama",
      "Peka terhadap kebutuhan pelanggan",
    ],
    next: [
      "Tulis ide usahamu: siapa pelanggannya, apa keunggulannya",
      "Tanyakan ke tim booth tentang pelatihan ZBS",
    ],
    ctaTitle: "Ngobrol soal pengembangan usaha",
    ctaText:
      "Ceritakan idemu ke tim booth dan tanyakan program ZBS yang sesuai.",
  },
  educator: {
    emoji: "🎓",
    name: "The Educator",
    color: "#2E8B7A",
    tagline: "Kamu paling senang melihat orang lain berkembang.",
    strengths: [
      "Sabar dan jelas saat menjelaskan",
      "Menginspirasi orang di sekitarmu",
      "Membangun kepercayaan dengan mudah",
    ],
    next: [
      "Mulai bagikan ilmumu lewat konten atau kelas kecil",
      "Tanyakan ke tim booth tentang program beasiswa WMM",
    ],
    ctaTitle: "Ngobrol soal beasiswa WMM",
    ctaText: "Tim booth siap menjelaskan program beasiswa WMM kepadamu.",
  },
  connector: {
    emoji: "🤝",
    name: "The Business Connector",
    color: "#4A5FC1",
    tagline: "Kamu penghubung antara orang dan peluang.",
    strengths: [
      "Mudah membangun relasi",
      "Melihat peluang saling melengkapi",
      "Komunikatif dan percaya diri",
    ],
    next: [
      "Petakan jaringan yang bisa saling melengkapi",
      "Diskusikan peluang kolaborasi bisnis dengan tim booth",
    ],
    ctaTitle: "Ngobrol soal kolaborasi",
    ctaText:
      "Sampaikan minatmu ke tim booth untuk membahas peluang kolaborasi bisnis.",
  },
};

const QUESTIONS = [
  {
    question:
      "Saat melihat produk atau layanan menarik, apa yang pertama kamu pikirkan?",
    options: [
      { text: "Bagaimana aku bisa mengkreasikannya?", profile: "creator" },
      { text: "Seberapa besar peluang usahanya?", profile: "beautypreneur" },
      {
        text: "Bagaimana cara mengajarkannya ke orang lain?",
        profile: "educator",
      },
      {
        text: "Siapa yang cocok diajak bekerja sama?",
        profile: "connector",
      },
    ],
  },
  {
    question: "Cara kerja yang paling cocok denganmu?",
    options: [
      {
        text: "Mengajak orang berkolaborasi dan bertukar kontak",
        profile: "connector",
      },
      {
        text: "Mengajarkan dan mendampingi orang lain",
        profile: "educator",
      },
      {
        text: "Membuat rencana dan menjalankan usaha",
        profile: "beautypreneur",
      },
      {
        text: "Berkarya langsung dengan tanganku sendiri",
        profile: "creator",
      },
    ],
  },
  {
    question: "Apa yang paling membuatmu semangat?",
    options: [
      { text: "Melihat hasil karya yang indah", profile: "creator" },
      {
        text: "Melihat usaha tumbuh dan berkembang",
        profile: "beautypreneur",
      },
      {
        text: "Melihat orang lain berhasil karena ilmu yang kubagikan",
        profile: "educator",
      },
      {
        text: "Bertemu orang baru dan membuka peluang",
        profile: "connector",
      },
    ],
  },
  {
    question: "Teman biasanya mencarimu untuk…",
    options: [
      { text: "Minta saran tampilan dan gaya", profile: "creator" },
      { text: "Minta ide cara mulai usaha", profile: "beautypreneur" },
      { text: "Minta diajari atau dijelaskan sesuatu", profile: "educator" },
      { text: "Minta dikenalkan ke orang yang tepat", profile: "connector" },
    ],
  },
  {
    question: "Kekuatan terbesarmu adalah…",
    options: [
      { text: "Kreativitas", profile: "creator" },
      { text: "Keberanian mengambil peluang", profile: "beautypreneur" },
      { text: "Kesabaran dan empati", profile: "educator" },
      { text: "Kemampuan membangun relasi", profile: "connector" },
    ],
  },
  {
    question: "Setahun ke depan, kamu paling ingin…",
    options: [
      {
        text: "Menguasai keahlian dan membuat karya terbaikku",
        profile: "creator",
      },
      {
        text: "Memulai atau mengembangkan usahaku",
        profile: "beautypreneur",
      },
      {
        text: "Berbagi ilmu dan menginspirasi lebih banyak orang",
        profile: "educator",
      },
      {
        text: "Memperluas jaringan dan kerja sama",
        profile: "connector",
      },
    ],
  },
];

function scoreResult(answers) {
  const counts = Object.fromEntries(ORDER.map((profile) => [profile, 0]));
  answers.forEach((answer) => {
    if (answer in counts) counts[answer] += 1;
  });
  const max = Math.max(...Object.values(counts));
  const tied = ORDER.filter((profile) => counts[profile] === max);
  const lastAnswer = answers[answers.length - 1];
  const winner = tied.includes(lastAnswer) ? lastAnswer : tied[0];
  return { winner, counts, tied };
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  let line = "";
  for (const word of text.split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      context.fillText(line, x, y);
      y += lineHeight;
      line = word;
    } else {
      line = candidate;
    }
  }
  context.fillText(line, x, y);
  return y + lineHeight;
}

function loadAvatar(profileKey) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Avatar could not be loaded"));
    image.src = AVATARS[profileKey].src;
  });
}

async function drawCard(profileKey, fullName) {
  const profile = PROFILES[profileKey];
  const avatar = await loadAvatar(profileKey);
  const poppinsFont =
    getComputedStyle(document.body).getPropertyValue("--font-poppins").trim() ||
    "Poppins";
  if (document.fonts?.load) {
    try {
      await document.fonts.load(`400 30px "${poppinsFont}"`);
    } catch {
      // Canvas will use its sans-serif fallback if the web font is unavailable.
    }
  }
  const width = 1080;
  const height = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is not supported");
  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, profile.color);
  gradient.addColorStop(1, "#2A1233");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  context.textBaseline = "alphabetic";

  const cardGradient = context.createLinearGradient(60, 260, 60, 1660);
  cardGradient.addColorStop(0, "#FCF8EF");
  cardGradient.addColorStop(1, "#F4EDDF");
  context.fillStyle = cardGradient;
  roundRect(context, 60, 260, 960, 1400, 42);
  context.fill();
  context.strokeStyle = `${profile.color}66`;
  context.lineWidth = 3;
  context.stroke();

  context.font = `700 22px ${poppinsFont}, sans-serif`;
  const titleWidth = context.measureText("BEAUTY DNA CARD").width + 40;
  const titleX = (width - titleWidth) / 2;
  context.fillStyle = profile.color;
  roundRect(context, titleX, 238, titleWidth, 46, 18);
  context.fill();
  context.textAlign = "center";
  context.fillStyle = "#FFFFFF";
  context.fillText("BEAUTY DNA CARD", width / 2, 267);
  context.fillStyle = profile.color;
  let nameFontSize = 44;
  context.font = `700 ${nameFontSize}px ${poppinsFont}, sans-serif`;
  while (context.measureText(fullName).width > 860 && nameFontSize > 26) {
    nameFontSize -= 1;
    context.font = `700 ${nameFontSize}px ${poppinsFont}, sans-serif`;
  }
  context.fillText(fullName, width / 2, 350);

  const avatarArea = { x: 60, y: 370, width: 960, height: 590 };
  const avatarScale = Math.min(
    avatarArea.width / avatar.naturalWidth,
    avatarArea.height / avatar.naturalHeight,
  );
  const avatarWidth = avatar.naturalWidth * avatarScale;
  const avatarHeight = avatar.naturalHeight * avatarScale;
  const avatarX = avatarArea.x + (avatarArea.width - avatarWidth) / 2;
  const avatarY = avatarArea.y + (avatarArea.height - avatarHeight) / 2;
  try {
    const avatarCanvas = document.createElement("canvas");
    avatarCanvas.width = Math.ceil(avatarWidth);
    avatarCanvas.height = Math.ceil(avatarHeight);
    const avatarContext = avatarCanvas.getContext("2d");
    if (!avatarContext) throw new Error("Avatar canvas is unavailable");
    avatarContext.drawImage(
      avatar,
      0,
      0,
      avatarCanvas.width,
      avatarCanvas.height,
    );
    avatarContext.globalCompositeOperation = "destination-in";
    const horizontalMask = avatarContext.createLinearGradient(
      0,
      0,
      avatarCanvas.width,
      0,
    );
    horizontalMask.addColorStop(0, "rgba(0, 0, 0, 0)");
    horizontalMask.addColorStop(0.09, "rgba(0, 0, 0, 1)");
    horizontalMask.addColorStop(0.91, "rgba(0, 0, 0, 1)");
    horizontalMask.addColorStop(1, "rgba(0, 0, 0, 0)");
    avatarContext.fillStyle = horizontalMask;
    avatarContext.fillRect(0, 0, avatarCanvas.width, avatarCanvas.height);
    const verticalMask = avatarContext.createLinearGradient(
      0,
      0,
      0,
      avatarCanvas.height,
    );
    verticalMask.addColorStop(0, "rgba(0, 0, 0, 0)");
    verticalMask.addColorStop(0.1, "rgba(0, 0, 0, 1)");
    verticalMask.addColorStop(0.9, "rgba(0, 0, 0, 1)");
    verticalMask.addColorStop(1, "rgba(0, 0, 0, 0)");
    avatarContext.fillStyle = verticalMask;
    avatarContext.fillRect(0, 0, avatarCanvas.width, avatarCanvas.height);
    context.drawImage(
      avatarCanvas,
      avatarX,
      avatarY,
      avatarWidth,
      avatarHeight,
    );
  } catch {
    context.drawImage(avatar, avatarX, avatarY, avatarWidth, avatarHeight);
  }

  context.fillStyle = "#2A1233";
  context.textAlign = "center";
  context.font = `700 60px ${poppinsFont}, sans-serif`;
  let y = wrapText(context, profile.name, width / 2, 1030, 850, 70);
  context.fillStyle = profile.color;
  context.font = `italic 33px ${poppinsFont}, sans-serif`;
  y = wrapText(context, profile.tagline, width / 2, y + 6, 820, 42);

  const maxWidth = 820;
  const x = 130;
  context.textAlign = "left";
  y += 8;
  context.fillStyle = profile.color;
  context.font = `700 33px ${poppinsFont}, sans-serif`;
  context.fillText("Kekuatanmu", x, y);
  y += 42;
  context.fillStyle = "#2A1233";
  context.font = `400 30px ${poppinsFont}, sans-serif`;
  profile.strengths.forEach((strength) => {
    y = wrapText(context, `•  ${strength}`, x, y, maxWidth, 38) + 2;
  });
  y += 10;
  context.fillStyle = profile.color;
  context.textAlign = "left";
  context.font = `700 33px ${poppinsFont}, sans-serif`;
  context.fillText("Langkah berikutnya", x, y);
  y += 42;
  context.fillStyle = "#2A1233";
  context.textAlign = "left";
  context.font = `400 30px ${poppinsFont}, sans-serif`;
  profile.next.forEach((step) => {
    y = wrapText(context, `•  ${step}`, x, y, maxWidth, 38) + 2;
  });

  const footerY = y + 42;
  context.textAlign = "center";
  context.fillStyle = "#2A1233";
  context.font = `700 25px ${poppinsFont}, sans-serif`;
  context.fillText(CONFIG.eventName, width / 2, footerY);
  context.fillStyle = profile.color;
  context.font = `600 25px ${poppinsFont}, sans-serif`;
  context.fillText(
    `${CONFIG.tagHandles ? `${CONFIG.tagHandles}  ` : ""}${CONFIG.hashtag}`,
    width / 2,
    footerY + 42,
  );
  context.fillStyle = "#6B5575";
  context.font = `400 22px ${poppinsFont}, sans-serif`;
  context.fillText(
    "Refleksi minat awal, bukan tes psikologi.",
    width / 2,
    footerY + 82,
  );
  return canvas;
}

export default function Home() {
  const [screen, setScreen] = useState("start");
  const [nameInput, setNameInput] = useState("");
  const [fullName, setFullName] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(() =>
    Array(QUESTIONS.length).fill(null),
  );
  const [resultKey, setResultKey] = useState(null);
  const [resultImage, setResultImage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showScrollCue, setShowScrollCue] = useState(false);
  const cardCanvasRef = useRef(null);
  const toastTimerRef = useRef(null);
  const questionHeadingRef = useRef(null);
  const resultSectionRef = useRef(null);
  const nameInputRef = useRef(null);
  const total = QUESTIONS.length;
  const currentQuestion = QUESTIONS[questionIndex];

  useEffect(() => {
    if (screen === "quiz") {
      questionHeadingRef.current?.focus({ preventScroll: true });
    } else if (screen === "result") {
      resultSectionRef.current?.focus({ preventScroll: true });
    } else if (screen === "name") {
      nameInputRef.current?.focus({ preventScroll: true });
    }
    window.scrollTo(0, 0);
  }, [screen, questionIndex]);

  useEffect(
    () => () => {
      window.clearTimeout(toastTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (screen !== "result") {
      setShowScrollCue(false);
      return;
    }
    const updateScrollCue = () => {
      const remaining =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;
      setShowScrollCue(remaining > 48);
    };
    const frame = window.requestAnimationFrame(updateScrollCue);
    window.addEventListener("scroll", updateScrollCue, { passive: true });
    window.addEventListener("resize", updateScrollCue);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollCue);
      window.removeEventListener("resize", updateScrollCue);
    };
  }, [screen, resultImage]);

  function showToast(message) {
    window.clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = window.setTimeout(() => setToastMessage(""), 3500);
  }

  function startQuiz(event) {
    event.preventDefault();
    const cleanName = nameInput.trim().replace(/\s+/g, " ");
    if (!cleanName) {
      showToast("Masukkan nama lengkap terlebih dahulu.");
      nameInputRef.current?.focus();
      return;
    }
    setFullName(cleanName);
    setQuestionIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setScreen("quiz");
  }

  function showNameForm() {
    setScreen("name");
  }

  async function showResult(finalAnswers) {
    const { winner } = scoreResult(finalAnswers);
    setResultKey(winner);
    try {
      const canvas = await drawCard(winner, fullName);
      cardCanvasRef.current = canvas;
      setResultImage(canvas.toDataURL("image/png"));
    } catch (error) {
      console.error("Failed to render Beauty DNA Card", error);
      cardCanvasRef.current = null;
      setResultImage("");
      showToast("Kartu gambar tidak dapat dibuat di browser ini.");
    }
    setScreen("result");
  }

  function goToNextQuestion() {
    if (answers[questionIndex] === null) return;
    if (questionIndex < total - 1) {
      setQuestionIndex((index) => index + 1);
    } else {
      showResult(answers);
    }
  }

  function goBack() {
    if (questionIndex > 0) {
      setQuestionIndex((index) => index - 1);
      return;
    }
    setNameInput(fullName);
    setScreen("name");
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setResultKey(null);
    setResultImage("");
    cardCanvasRef.current = null;
    setScreen("start");
  }

  function canvasBlob() {
    return new Promise((resolve, reject) => {
      const canvas = cardCanvasRef.current;
      if (!canvas) {
        reject(new Error("No card canvas"));
        return;
      }
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("Empty image blob")),
        "image/png",
      );
    });
  }

  function downloadImage(blob) {
    const link = document.createElement("a");
    if (!("download" in link)) throw new Error("Downloads are not supported");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "beauty-dna-card.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  async function saveCard() {
    try {
      downloadImage(await canvasBlob());
      showToast("Kartu disimpan. Cek folder Unduhan atau Galeri.");
    } catch {
      showToast("Tekan lama gambar kartu, lalu pilih “Simpan gambar”.");
    }
  }

  async function shareCard() {
    const profile = PROFILES[resultKey];
    const text = `Hasil Beauty DNA-ku: ${profile.name} ${profile.emoji} ${CONFIG.tagHandles ? `${CONFIG.tagHandles} ` : ""}${CONFIG.hashtag}`;
    try {
      const blob = await canvasBlob();
      const file = new File([blob], "beauty-dna-card.png", {
        type: "image/png",
      });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          text,
          title: "Beauty DNA Card",
        });
        return;
      }
      downloadImage(blob);
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
        } catch {}
      }
      showToast(
        "Kartu disimpan. Buka Instagram, unggah ke Story, lalu tag kami.",
      );
    } catch (error) {
      if (error?.name === "AbortError") return;
      if (navigator.share) {
        try {
          await navigator.share({ text, title: "Beauty DNA Card" });
          return;
        } catch (shareError) {
          if (shareError?.name === "AbortError") return;
        }
      }
      showToast(
        "Tekan lama gambar kartu untuk menyimpan, lalu unggah ke Story.",
      );
    }
  }

  const profile = resultKey ? PROFILES[resultKey] : null;
  const progress = ((questionIndex + 1) / total) * 100;

  return (
    <main className="app">
      {screen === "start" && (
        <section className="screen screen-start" aria-labelledby="start-title">
          <p className="event">{CONFIG.eventName}</p>
          <h1 id="start-title">
            Discover Your <span className="dna">Beautypreneur DNA</span>
          </h1>
          <p className="lead">
            Jawab 6 pertanyaan singkat dan dapatkan Beauty DNA Card yang bisa
            kamu simpan atau bagikan ke Instagram Story.
          </p>
          <p className="note">
            Hanya 1–2 menit. Hasil kuis adalah refleksi minat awal, bukan tes
            psikologi atau penentu kesuksesan seseorang.
          </p>
          <section className="benefits" aria-labelledby="benefits-title">
            <h2 id="benefits-title">Apa yang akan kamu dapatkan:</h2>
            <div className="benefit-grid">
              <div className="benefit-item">
                <Dna aria-hidden="true" />
                <span>Wawasan DNA Personal</span>
              </div>
              <div className="benefit-item">
                <Camera aria-hidden="true" />
                <span>Kartu Estetik untuk Dibagikan</span>
              </div>
              <div className="benefit-item">
                <BriefcaseBusiness aria-hidden="true" />
                <span>Rekomendasi Awal Bisnis</span>
              </div>
            </div>
          </section>
          <div className="sample-stage" aria-label="Contoh Beauty DNA Card">
            <Image
              alt=""
              aria-hidden="true"
              className="sample-background"
              fill
              priority
              sizes="(max-width: 480px) 100vw, 480px"
              src={sampleBackground}
            />
            <article className="sample-card">
              <div className="sample-card-top">
                <span className="sample-mark">
                  <Dna aria-hidden="true" />
                </span>
                <span>BEAUTY DNA CARD</span>
                <Sparkles aria-hidden="true" className="sample-sparkle" />
              </div>
              <div className="sample-identity">
                <span className="sample-avatar">
                  <UserRound aria-hidden="true" />
                </span>
                <div>
                  <strong>SALMA RAHMANI</strong>
                  <span>THE BEAUTY CREATOR</span>
                </div>
              </div>
              <div className="sample-divider" />
              <p>
                KREATIF <span>•</span> DETAIL <span>•</span> PENUH IDE
              </p>
              <div className="sample-card-bottom">
                <span>BEAUTY DNA</span>
                <span>YOUR NEXT CHAPTER STARTS HERE</span>
              </div>
            </article>
            <button
              className="btn primary"
              onClick={showNameForm}
              type="button"
            >
              Mulai kuis
            </button>
          </div>
        </section>
      )}

      {screen === "name" && (
        <section className="screen name-screen" aria-labelledby="name-title">
          <p className="event">{CONFIG.eventName}</p>
          <h2 id="name-title">Nama untuk Beauty DNA Card</h2>
          <form className="name-form" onSubmit={startQuiz}>
            <label htmlFor="full-name">Nama lengkap</label>
            <input
              autoComplete="name"
              id="full-name"
              maxLength={60}
              name="fullName"
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="Tulis nama lengkapmu"
              ref={nameInputRef}
              required
              value={nameInput}
            />
            <div className="name-actions">
              <button
                className="btn ghost"
                onClick={() => setScreen("start")}
                type="button"
              >
                Kembali
              </button>
              <button className="btn primary" type="submit">
                Lanjut
              </button>
            </div>
          </form>
        </section>
      )}

      {screen === "quiz" && (
        <section className="screen" aria-labelledby="question-title">
          <div className="progress-wrap">
            <div
              className="progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={questionIndex + 1}
              aria-label="Kemajuan kuis"
            >
              <div className="bar" style={{ width: `${progress}%` }} />
            </div>
            <p className="count">
              Pertanyaan {questionIndex + 1} dari {total}
            </p>
          </div>
          <h2 id="question-title" ref={questionHeadingRef} tabIndex={-1}>
            {currentQuestion.question}
          </h2>
          <div
            className="options"
            role="radiogroup"
            aria-labelledby="question-title"
          >
            {currentQuestion.options.map((option) => (
              <label
                className={`opt${answers[questionIndex] === option.profile ? " selected" : ""}`}
                key={option.profile}
              >
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={option.profile}
                  checked={answers[questionIndex] === option.profile}
                  onChange={() =>
                    setAnswers((previous) =>
                      previous.map((answer, index) =>
                        index === questionIndex ? option.profile : answer,
                      ),
                    )
                  }
                />
                {option.text}
              </label>
            ))}
          </div>
          <div className="nav">
            <button className="btn ghost" onClick={goBack} type="button">
              Kembali
            </button>
            <button
              className="btn primary"
              onClick={goToNextQuestion}
              type="button"
              disabled={answers[questionIndex] === null}
            >
              {questionIndex === total - 1 ? "Lihat hasil" : "Lanjut"}
            </button>
          </div>
        </section>
      )}

      {screen === "result" && profile && (
        <section
          className="screen"
          aria-label="Hasil kuis"
          ref={resultSectionRef}
          tabIndex={-1}
        >
          <p className="event result-label">Hasil kamu</p>
          {resultImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="card-img"
              src={resultImage}
              alt={`Beauty DNA Card untuk ${fullName}: ${profile.name}. ${profile.tagline} Kekuatan: ${profile.strengths.join(", ")}.`}
            />
          ) : (
            <p className="note">Kartu gambar tidak tersedia di browser ini.</p>
          )}
          <p className="hint">
            Tidak bisa menyimpan otomatis? Tekan lama gambar kartu, lalu pilih
            “Simpan gambar”.
          </p>
          <div className="actions">
            <button className="btn primary" onClick={saveCard} type="button">
              Simpan kartu
            </button>
            <button className="btn secondary" onClick={shareCard} type="button">
              Bagikan ke Story
            </button>
          </div>
          <div className="cta">
            <h3>{profile.ctaTitle}</h3>
            <p>{profile.ctaText}</p>
            {CONFIG.contactUrl && (
              <a
                className="btn secondary"
                href={CONFIG.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tinggalkan kontakmu
              </a>
            )}
          </div>
          <button
            className="btn ghost restart"
            onClick={restartQuiz}
            type="button"
          >
            Ulangi kuis
          </button>
          <p className="note">Refleksi minat awal, bukan tes psikologi.</p>
        </section>
      )}

      {showScrollCue && (
        <button
          aria-label="Gulir untuk melihat deskripsi hasil"
          className="scroll-cue"
          onClick={() =>
            window.scrollBy({
              top: Math.round(window.innerHeight * 0.68),
              behavior: "smooth",
            })
          }
          type="button"
        >
          <ArrowDown aria-hidden="true" />
        </button>
      )}

      <p
        className={`toast${toastMessage ? " show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </p>
    </main>
  );
}
