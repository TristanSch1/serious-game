import mongoose from "mongoose";
import { TMongooseId } from "../../_common/_types/MongooseTypes";

export interface ICategoryModel {
    _id?: TMongooseId;
    urlAlias: string;
    imageUrl: string;
    blockTitle: string;
    blockDescription: string;
    pageTitle: string;
    pageDescription: string;
}

export interface ICategoryDocument extends Omit<ICategoryModel, "_id">, mongoose.Document {}

const CategorySchema = new mongoose.Schema<ICategoryModel>({
    urlAlias: { type: String, trim: true, required: true },
    imageUrl: { type: String, trim: true, required: true },
    blockTitle: { type: String, trim: true, required: true },
    blockDescription: { type: String, trim: true, required: true },
    pageTitle: { type: String, trim: true, required: true },
    pageDescription: { type: String, trim: true, required: true },
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
