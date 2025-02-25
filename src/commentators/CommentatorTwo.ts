import { injectable } from "inversify";
import Comment from "../models/Comment.js";
import Money from "../models/Money.js";
import Commentator from "./Commentator.js";

@injectable()
export default class CommentatorTwo implements Commentator {
    public execute(left: Money, right: Money): Comment[] {
        const comments: Comment[] = [];
        if (left < right) comments.push(Comment.parse("Left isn't as great as right"));
        if (left > right) comments.push(Comment.parse("Left isn't as less than right"));
        if (left === right) comments.push(Comment.parse("Left is jivving with right"));
        return comments;
    }
}