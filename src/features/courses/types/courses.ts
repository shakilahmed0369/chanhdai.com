export type Course = {
  /** Stable unique identifier. */
  id: string
  title: string
  /** Course platform or institution. */
  platform: string
  /** Course period for display. Use "MM.YYYY" format. Omit `end` for ongoing courses. */
  period: {
    start: string
    end?: string
  }
  /** Public URL to the course. */
  link: string
  /** Student count (e.g. "12,345" or "40,000+"). */
  students?: string
  /** Tags/technologies covered in the course. */
  skills: string[]
  /** Optional course thumbnail image URL. */
  image?: string
  /** Optional short description. */
  description?: string
}
