export function formatPublishedDate(date?: string): string {
  if (!date) {
    return "발행일 미정";
  }

  const parsedDate = new Date(`${date}T00:00:00+09:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(parsedDate);
}
