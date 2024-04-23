import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  fullName: string;

  @Prop({ min: 16, max: 200 })
  age: number;

  @Prop()
  countrtyCode: string;

  @Prop()
  mobile: string;

  @Prop({ type: Boolean, default: false })
  isMobileVerified: boolean;

  @Prop({
    type: String,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for email validation
      'Please enter a valid email address', // Custom error message
    ],
  })
  email: string;

  @Prop({ type: Boolean, default: false })
  isEmailVerified: boolean;

  @Prop()
  profilePicUrl: string;

  @Prop({ type: mongooseSchema.Types.ObjectId })
  roleId: string;

  @Prop()
  lastSignedInAt: Date;

  @Prop()
  currentSignedInAt: Date;

  @Prop()
  accountDeletedAt: Date;

  @Prop()
  myBio: string;

  @Prop()
  genderId: string;

  @Prop()
  uniqueUserId: string;

  @Prop()
  inviteLink: string;

  @Prop()
  referralCode: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop()
  authKey: string;

  @Prop({ type: mongooseSchema.Types.ObjectId })
  createdBy: mongooseSchema.Types.ObjectId;

  @Prop({ type: mongooseSchema.Types.ObjectId })
  updatedBy: mongooseSchema.Types.ObjectId;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ countrtyCode: 1, mobile: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ uniqueUserId: 1 }, { unique: true });
UserSchema.index({ age: 1 });

export default UserSchema;
