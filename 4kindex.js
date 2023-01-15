const channels = [
  {
    channelName: "MBC 1",
    src: "https://eliotlencelot.fr/Applications/Proxy/Proxy.php/https://shls-mbc1na-prod-dub.shahid.net/out/v1/84ab37e99d6e4b16b33c6600f94f6ccb/index_1.m3u8",
  },
  {
    channelName: "Spacetoon",
    src: "https://streams.spacetoon.com/live/stchannel/smil:livesmil.smil/playlist.m3u8",
  },
  {
    channelName: "NAT GEO Abu Dhabi",
    src: "https://admdn2.cdn.mangomolo.com/nagtv/smil:nagtv.stream.smil/chunklist_b4000000_t64MTA4MHA=.m3u8",
  },
  {
    channelName: "DUBAI ONE",
    src: "https://dminnvll.cdn.mangomolo.com/dubaione/smil:dubaione.stream.smil/playlist.m3u8",
  },
  {
    channelName: "Aljazeera Arabic",
    src: "https://live-hls-web-aja.getaj.net/AJA/index.m3u8",
  },
  {
    channelName: "Aljazeera English",
    src: "https://live-hls-web-aje.getaj.net/AJE/index.m3u8",
  },
  {
    channelName: "Alarabiya",
    src: "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8",
  },
  {
    channelName: "Sky News Arabia",
    src: "https://stream.skynewsarabia.com/hls/sna_720.m3u8",
  },
  {
    channelName: "Syria TV",
    src: "https://svs.itworkscdn.net/syriatvlive/syriatv.smil/playlist.m3u8",
  },
  {
    channelName: "Abu Dhabi Sports 1",
    src: "https://admdn1.cdn.mangomolo.com/adsports1/smil:adsports1.stream.smil/playlist.m3u8",
  },
  {
    channelName: "Abu Dhabi Sports 2",
    src: "https://admdn5.cdn.mangomolo.com/adsports2/smil:adsports2.stream.smil/playlist.m3u8",
  },
  {
    channelName: "Dubai Sports",
    src: "https://dmitnthvll.cdn.mangomolo.com/dubaisports/smil:dubaisports.smil/index.m3u8",
  },
  {
    channelName: "Dubai Sports 2",
    src: "https://dmitwlvvll.cdn.mangomolo.com/dubaisportshd/smil:dubaisportshd.smil/index.m3u8",
  },
  {
    channelName: "Sharjah Sport",
    src: "https://svs.itworkscdn.net/smc4sportslive/smc4.smil/playlist.m3u8",
  },
  {
    channelName: "Abu Dhabi TV",
    src: "https://admdn2.cdn.mangomolo.com/adtv/smil:adtv.stream.smil/chunklist.m3u8",
  },
  {
    channelName: "Emarat TV",
    src: "https://admdn3.cdn.mangomolo.com/emarat/smil:emarat.stream.smil/playlist.m3u8",
  },
  {
    channelName: "Sama Dubai",
    src: "https://dmieigthvll.cdn.mgmlcdn.com/samadubaiht/smil:samadubai.stream.smil/chunks.m3u8",
  },
];

const jwtConfigSetup = {
  file: channels.find(
    (c) =>
      c.channelName === localStorage.getItem("channelNamePlaying") ||
      c.channelName === "DUBAI ONE"
  ).src,
  width: "100%",
  height: "100%",
  skin: "glow",
  autostart: true,
  primary: "flash",
  fallback: "false",
  abouttext: "",
  aboutlink: "",
  displaytitle: "false",
  ga: "{}",
};

const getPlayerWrapper = () =>
  document.querySelector("#content #player-wrapper #jwplayer-wrapper");
const getBbcArabicIframe = () => document.querySelector("#bbc-iframe");

const getElementByDataSrc = (dataSrc) =>
  document.querySelector(`[data-src="${dataSrc}"]`);

let currentlyPlayingSrc = null;
const handleHighlightingSelectedChannel = (_src, channelsList, channelName) => {
  const currentElement = getElementByDataSrc(_src);
  if (currentElement) {
    [...channelsList.children].forEach((el) => {
      const _el =
        el.querySelector(".channel-name") || el.querySelector(".bbc-arabic");
      if (_el?.getAttribute("id")?.includes("selected-channel-indicator")) {
        _el.setAttribute(
          "id",
          _el.getAttribute("id").replace("selected-channel-indicator", "")
        );
      }
    });
    currentElement.setAttribute("id", "selected-channel-indicator");
  }
  if (_src) {
    localStorage.setItem("channelNamePlaying", channelName);
    currentlyPlayingSrc = _src;
  }
};

const stopBBCPlayer = () => {
  setTimeout(() => {
    getBbcArabicIframe().style.display = "none";
    const iframeSrc = getBbcArabicIframe().src;
    getBbcArabicIframe().src = iframeSrc;
  }, 0);
};

function main() {
  loadContent();
}

function loadContent() {
  const jwtInstance = jwplayer("jwplayer-wrapper");
  jwtInstance.setup(jwtConfigSetup);

  const getSrcElement = () => document.querySelector("#player-src");
  const channelsList = document.querySelector("#channels-list");
  const inputWrapper = document.querySelector("#input-wrapper");

  const bbcArabicButton = document.querySelector(".bbc-arabic");
  bbcArabicButton.addEventListener("click", () => {
    setTimeout(() => {
      getPlayerWrapper().style.display = "none";
    }, 0);
    getBbcArabicIframe().style.display = "block";
    // .stop is not available in the free version, workaround: setting the file will stop playback
    jwtInstance.setup({
      ...jwtConfigSetup,
      file: channels.find((c) => c.channelName === "DUBAI ONE").src,
    });
  });

  const showHideSidebar = document.querySelector(".show-hide-sidebar");
  showHideSidebar.addEventListener("click", () => {
    // User closed the sidebar : User opened the sidebar
    channelsList.style.display =
      channelsList.style.display !== "none" ? "none" : "flex";
  });

  const showHideInput = document.querySelector(".show-hide-input");
  showHideInput.addEventListener("click", () => {
    if (!inputWrapper.style.display) {
      inputWrapper.style.display = "none";
    }
    // User closed the input : User opened the input
    inputWrapper.style.display =
      inputWrapper.style.display !== "none" ? "none" : "flex";
  });

  const createChannelItemAndAppendToList = ({ src, channelName }) => {
    const channelItem = document.createElement("li");
    channelItem.classList.add("channel-item");
    channelItem.innerHTML = `<p class="channel-name" data-src="${src}">${channelName}</p>`;
    channelsList.appendChild(channelItem);
  };

  function onLoad() {
    channels.forEach((channelName) => {
      createChannelItemAndAppendToList(channelName);
    });
  }

  onLoad();

  function play(_src, channelName) {
    const playButton = document.querySelector("#play-button");
    const a = () => {
      const src = _src || getSrcElement().value.trim();
      if (src) {
        jwtInstance.setup({ ...jwtConfigSetup, file: src });
        // .play is not available in the free version of jwplayer
        // jwtInstance.play();

        document.title = channelName || "m3u8 player";
      } else if (src === "") {
      }
    };
    _src ? a() : playButton.addEventListener("click", a);
    if (getPlayerWrapper().style.display === "none") {
      getPlayerWrapper().style.display = "block";
    }
    if (_src !== "bbc-arabic") {
      stopBBCPlayer();
    }

    handleHighlightingSelectedChannel(_src, channelsList, channelName);
  }

  play();

  function playChannel() {
    channelsList.addEventListener("click", (event) => {
      if (event.target.closest(".turn-off")) {
        const channelsList = document.querySelector("#channels-list");
        jwtInstance.setup({
          ...jwtConfigSetup,
          file:
            currentlyPlayingSrc ||
            channels.find(
              (c) =>
                c.channelName === localStorage.getItem("channelNamePlaying") ||
                c.channelName === "DUBAI ONE"
            ).src,
        });
        handleHighlightingSelectedChannel("", channelsList, channelName);
        stopBBCPlayer();
        setTimeout(() => {
          getPlayerWrapper().style.display = "none";
        }, 0);
      } else if (event.target.getAttribute("data-src")) {
        play(event.target.getAttribute("data-src"), event.target.textContent);
      }
    });
  }

  playChannel();
}

main();
