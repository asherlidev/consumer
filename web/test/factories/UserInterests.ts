import { Factory } from 'rosie';
import * as faker from 'faker';
import { Category } from '../../src/components/Pages/EventDetailPage/EventDetailPageContent';

export default new Factory<Category>() // using Partial for brevity's sake. todo, remove it.
  .sequence('id')
  .attr('name', faker.lorem.word);
