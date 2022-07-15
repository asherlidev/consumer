import { Factory } from 'rosie';
// import * as faker from "faker";
import { User } from '../../src/context/user/UserProvider';
import UserInterests from './UserInterests';

interface UserFactoryOptions {
  interestCount?: number;
}

type UserFactoryProps = Partial<User> & UserFactoryOptions;

// Using Partial for brevity's sake.
// @todo: add all other user fields and remove Partial.
export default new Factory<UserFactoryProps>()
  .option('interestCount', 5)
  .attr('interests', ['interestCount'], (interestCount) => {
    if (interestCount) return UserInterests.buildList(interestCount);
    return [];
  });
