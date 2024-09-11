"use server";
import { workspaces } from "../../../migrations/schema";
import db from "./db";
import { Subscription, workspace } from "./supabase.types";

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (subscription, { eq }) => eq(subscription.userId, userId),
    });
    if (data) return { data: data as Subscription, error: null };
    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: `Error ${error}` };
  }
};

export const createWorkspace = async (workspace: workspace) => {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: `Error ${error}` };
  }
};
