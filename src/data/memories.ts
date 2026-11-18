
export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  contributor: string;
  date: string;
  tags: string[];
}

export const memoriesData: Memory[] = [
  {
    id: "1",
    imageUrl: "/photos/first-date.jpg",
    caption: "October 16. The day I met my favorite girl. ❤️",
    contributor: "Joseph",
    date: "2026-10-16",
    tags: ["first date", "my princess"],
  },
  {
    id: "2",
    imageUrl: "/photos/us-together.jpg",
    caption: "Every moment with you feels like my favorite one.",
    contributor: "Joseph",
    date: "",
    tags: ["us", "my happiness"],
  },
  {
    id: "3",
    imageUrl: "/photos/my-pretty-girl.jpg",
    caption: "My pretty girl. I could look at you forever. 🥹",
    contributor: "Joseph",
    date: "",
    tags: ["mi princesa", "beautiful"],
  },
  {
    id: "4",
    imageUrl: "/photos/our-memory.jpg",
    caption: "Somehow, the universe knew exactly who I needed. ✨",
    contributor: "Joseph",
    date: "",
    tags: ["invisible string", "my person"],
  },
];
