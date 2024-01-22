export type ListBlogEntriesBody = {
  searchCriteria: "author" | "title" | "content";
  searchValue: string;
};

export type CreateBlogEntryBody = {
  title: string;
  content: string;
};

export type ListBlogEntriesResponse = {
  blogEntries: BlogEntryData[];
};

export type BlogEntryData = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  likes_count: string;
  author: { name: string };
};

export type GetBlogEntryResponse = {
  blogEntry: BlogEntryData;
  liked: boolean;
};
