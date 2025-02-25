import { injectable } from "inversify";
import Comment from "../models/Comment.js";
import Money from "../models/Money.js";
import Commentator from "./Commentator.js";

@injectable()
export default class CommentatorOne extends Commentator {
    public execute(left: Money, right: Money): Comment[] {
        const comments: Comment[] = [];
        if (left < right) comments.push(Comment.parse("Left is less than right"));
        if (left > right) comments.push(Comment.parse("Left is greater than right"));
        if (left === right) comments.push(Comment.parse("Left is equal to right"));
        return comments;
    }
}