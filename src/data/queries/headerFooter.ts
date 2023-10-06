import {
  QueryData,
  QueryFormatter,
  QueryOpts,
  QueryParams,
} from 'next-drupal-query'
import { queries } from '.'
import { drupalClient } from '@/lib/drupal/drupalClient'
import { Menu, HeaderMegaMenu } from '@/types/dataTypes/drupal/menu'
import { HeaderFooterData, MegaMenuPromoColumn } from '@/types/index'
import { buildHeaderFooterData } from '@/lib/utils/headerFooter'

export type RawHeaderFooterData = {
  footerColumns: Menu
  footerBottomRail: Menu
  headerMegaMenu: HeaderMegaMenu
  promoBlocks: MegaMenuPromoColumn[]
}

// Define the query params for fetching footer menu data.
export const params: QueryParams<null> = () => {
  return queries.getParams().addFields('menu_items', ['title,url'])
}

// Define the query params for fetching header megamenu data.
export const megaMenuParams: QueryParams<null> = () => {
  return queries.getParams().addInclude(['field_promo_reference'])
}

export const promoBlockParams: QueryParams<null> = () => {
  return queries
    .getParams()
    .addInclude(['field_image', 'field_image.media', 'field_promo_link'])
}

// Define the option types for the data loader.
type DataOpts = QueryOpts<{
  params?: object
  megaMenuParams?: object
  promoBlockParams?: object
}>

export const data: QueryData<DataOpts, RawHeaderFooterData> = async (opts) => {
  // Gather data from the different menus for the headerFooter data object
  const footerColumns = await drupalClient.getMenu('va-gov-footer', opts.params)
  const footerBottomRail = await drupalClient.getMenu(
    'footer-bottom-rail',
    opts.params
  )
  const headerMegaMenu: HeaderMegaMenu = await drupalClient.getMenu(
    'header-megamenu',
    opts.megaMenuParams
  )

  // promo blocks only exist on certain items in the menu
  const blocksToGather = headerMegaMenu.items.filter(
    (item) => item.field_promo_reference !== null || undefined
  )
  const promoBlocks = []

  // query actual block data from reference
  for (const block of blocksToGather) {
    const promo = await queries.getData('block_content--promo', {
      id: block.field_promo_reference.id,
    })
    promoBlocks.push(promo)
  }

  return {
    footerColumns,
    footerBottomRail,
    headerMegaMenu,
    promoBlocks,
  }
}

export const formatter: QueryFormatter<
  RawHeaderFooterData,
  HeaderFooterData
> = ({ footerColumns, footerBottomRail, headerMegaMenu, promoBlocks }) => {
  const { footerData, megaMenuData } = buildHeaderFooterData({
    footerBottomRail,
    footerColumns,
    headerMegaMenu,
    promoBlocks,
  })

  // Data assembled into shape front-end widget expects
  return {
    footerData,
    megaMenuData,
  }
}
