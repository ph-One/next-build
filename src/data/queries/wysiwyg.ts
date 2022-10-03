// Define the query params for fetching paragraph--wysiwyg & paragraph--rich_text_char_limit_1000.
import {
  ParagraphWysiwyg,
  ParagraphRichTextCharLimit1000,
} from '@/types/dataTypes/drupal/paragraph'
import { QueryFormatter } from 'next-drupal-query'
import { WysiwygType } from '@/types/index'
import { drupalToVaPath, phoneLinks } from '@/lib/utils/helpers'

export const formatter: QueryFormatter<
  ParagraphWysiwyg | ParagraphRichTextCharLimit1000,
  WysiwygType
> = (entity: ParagraphWysiwyg | ParagraphRichTextCharLimit1000) => {
  const data = [entity.field_wysiwyg?.processed]
  const filters = [phoneLinks, drupalToVaPath]
  const filteredData = filters.reduce((d, f) => d.filter(f), data)

  return {
    id: entity.id,
    html: filteredData[0],
  }
}
