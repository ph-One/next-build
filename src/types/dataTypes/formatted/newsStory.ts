import { ComponentType } from 'react'
import { PersonProfileTeaserProps } from '@/templates/components/personProfile'
import { SocialLinksProps } from '@/templates/common/socialLinks'
import { Administration } from '@/types/dataTypes/formatted/administration'
import { BreadcrumbItem } from '@/types/dataTypes/drupal/field_type'
import { PublishedEntity } from './publishedEntity'
import { MediaImage } from './media'

export type NewsStoryTeaser = PublishedEntity & {
  headingLevel?: ComponentType | keyof JSX.IntrinsicElements
  link: string
  title: string
  image: MediaImage
  introText: string
}

export type NewsStory = PublishedEntity & {
  title: string
  image: MediaImage
  caption: string
  author: PersonProfileTeaserProps
  introText: string
  bodyContent: string
  date: string
  socialLinks: SocialLinksProps
  listing: string
  entityId: number
  entityPath: string
  administration: Administration
  breadcrumbs: BreadcrumbItem[]
}
