import type Money from "../models/Money.js";
import type Comment from "../models/Comment.js";

export default abstract class Commentator {
    public abstract execute(left: Money, right: Money): Comment[];
}