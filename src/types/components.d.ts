import { RouteLocationRaw } from 'vue-router';

interface ItemLink
{
  icon: string,
  label: string,
  to?: RouteLocationRaw
}

export interface ExpansionItemLink extends ItemLink
{
  links?: ItemLink[]
}
/**
 * Ivue carousel settings
 */
export interface IVueCarouselSettings
{
  itemsToShow?: number;
  itemsToScroll?: number;
  wrapAround?: boolean;
  snapAlign?: 'start' | 'center' | 'end';
  transition?: number;
  mouseDrag?: boolean;
  touchDrag?: boolean;

}