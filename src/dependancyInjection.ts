import { Container, type interfaces } from "inversify";
import Commentator from "./commentators/Commentator.js";
import CommentatorOne from "./commentators/CommentatorOne.js";
import CommentatorTwo from "./commentators/CommentatorTwo.js";
import Configuration from "./repositories/Configuration.js";
import AccessTokenGenerator from "./services/AccessTokenGenerator.js";
import GraphApi from "./services/GraphApi.js";
import SharepointAccessor from "./services/SharepointAccessor.js";

const container = new Container(); // Autobind does not use singleton binding or support multi binding so not used
container.bind(SharepointAccessor).toSelf().inSingletonScope();
container.bind(GraphApi).toSelf().inSingletonScope();
container.bind(AccessTokenGenerator).toSelf().inSingletonScope();
container.bind(Configuration).toSelf().inSingletonScope();
container.bind(Commentator).to(CommentatorOne).inSingletonScope();
container.bind(Commentator).to(CommentatorTwo).inSingletonScope();

export const resolve = <T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T =>
    container.get(serviceIdentifier);

export const resolveMany = <T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T[] =>
    container.getAll<T>(serviceIdentifier);
