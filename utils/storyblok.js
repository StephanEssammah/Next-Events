import axios from "axios";

export const getStoryblokContent = async () => {
  const storyblok = await axios.get(
    `https://api.storyblok.com/v1/cdn/stories?token=${process.env.STORYBLOK_TOKEN}&version=draft`
  );
  const events = storyblok.data.stories.map((event) => event.content);
  return events;
};
