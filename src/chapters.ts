export type Chapter = {
  id: string;
  year: string;
  label: string;
  title: string;
  description: string;
  detail: string;
  tags: string[];
  status: string;
};

export const chapters: Chapter[] = [
  {
    id: "era1",
    year: "1990s",
    label: "First contact",
    title: "A page. A link. A whole new world.",
    description:
      "You sat down, dialed in, and waited. Then a page appeared from somewhere else on Earth. The web made a simple idea possible: anyone could publish, and anyone could follow a link.",
    detail: "The browser became a window to the world.",
    tags: ["HTML", "Hyperlinks", "Dial-up"],
    status: "ARCHIVE / 01",
  },
  {
    id: "era2",
    year: "2000s",
    label: "Open channels",
    title: "The audience took the controls.",
    description:
      "Personal pages became profiles. Readers became writers, photographers, and filmmakers. The web stopped being a place you visited and became a place you belonged.",
    detail: "Connection started to mean people, not just computers.",
    tags: ["Blogs", "Social networks", "Online video"],
    status: "ARCHIVE / 02",
  },
  {
    id: "era3",
    year: "2010s",
    label: "Always connected",
    title: "The entire internet. In your pocket.",
    description:
      "Touchscreens, faster mobile networks, and cloud services moved the web into everyday life. A map, a camera, a conversation. All within reach, wherever you were.",
    detail: "Going online became being online.",
    tags: ["Mobile", "Cloud", "Streaming"],
    status: "ARCHIVE / 03",
  },
  {
    id: "era4",
    year: "2020s",
    label: "New intelligence",
    title: "We started talking to the interface.",
    description:
      "Search boxes became conversations. Generative tools can draft, code, and create, while raising new questions about trust, ownership, and the work we hand over.",
    detail: "More capability. More responsibility.",
    tags: ["Generative AI", "Natural language", "Human oversight"],
    status: "CURRENT TRAJECTORY",
  },
  {
    id: "era5",
    year: "2030s",
    label: "Beyond the screen",
    title: "What if the web had a sense of place?",
    description:
      "Imagine information anchored to the room around you. Shared spaces, useful digital overlays, and interfaces that leave your hands free. The question is whether they make life better outside the screen.",
    detail: "A possible destination, not a promised arrival.",
    tags: ["Spatial interfaces", "Mixed reality", "Digital presence"],
    status: "POSSIBLE FUTURE / 01",
  },
  {
    id: "era6",
    year: "2050s",
    label: "The next frontier",
    title: "How far can a connection go?",
    description:
      "Perhaps the next web reaches across planets. Perhaps its biggest achievement is making connection more accessible here on Earth. The technology is uncertain. The need to reach each other is not.",
    detail: "The future is still an open channel.",
    tags: ["Deep-space networks", "Accessibility", "Human connection"],
    status: "POSSIBLE FUTURE / 02",
  },
];
