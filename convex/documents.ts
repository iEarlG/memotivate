import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (q) =>
                q.eq("userId", userId)
                .eq("parentDocument", args.parentDocument)
            )
            .filter((q) =>
                q.eq(q.field("isArchived"), false)
            )
            .order("desc")
            .collect();

        return documents;
    }
});

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents")),
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const documents = await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false,
        });

        return documents;
    }
});

export const archive = mutation({
    args: {id: v.id("documents")},
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const existingDocuments = await ctx.db.get(args.id);

        if(!existingDocuments) {
            throw new Error("Not found");
        }

        if (existingDocuments.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const recurviseArchive = async(documentId: Id<"documents">) => {
            const childrenDocument = await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (q) => (
                q.eq("userId", userId)
                 .eq("parentDocument", documentId)
            ))
            .collect();

            for (const child of childrenDocument) {
                await ctx.db.patch(child._id, {
                    isArchived: true,
                });

                await recurviseArchive(child._id);
            }
        };

        const documents = await ctx.db.patch(args.id, {
            isArchived: true,
        });

        recurviseArchive(args.id);

        return documents;
    }
});

export const getTrash = query({
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("isArchived"), true))
            .order("desc")
            .collect();
        
        return documents;
    }
});

export const restoreDocs = mutation({
    args: {id: v.id("documents")},
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const existingDocuments = await ctx.db.get(args.id);

        if (!existingDocuments) {
            throw new Error("Not found");
        }

        if (existingDocuments.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const recurviseRestore = async(documentId: Id<"documents">) => {
            const childrenDocs = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", (q) => (
                    q.eq("userId", userId)
                     .eq("parentDocument", documentId)
                ))
                .collect();

            for (const child of childrenDocs) {
                await ctx.db.patch(child._id, {
                    isArchived: false,
                });

                await recurviseRestore(child._id);
            }
        };

        const options: Partial<Doc<"documents">> = {
            isArchived: false,
        }

        if (existingDocuments.parentDocument) {
            const parentDocs = await ctx.db.get(existingDocuments.parentDocument);

            if (parentDocs?.isArchived) {
                options.parentDocument = undefined;
            }
        }

        const documents = await ctx.db.patch(args.id, options);
        recurviseRestore(args.id);

        return documents;
    }
});

export const removeDocs = mutation({
    args: {id: v.id("documents")},
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const existingDocuments = await ctx.db.get(args.id);

        if (!existingDocuments) {
            throw new Error("Not found");
        }

        if (existingDocuments.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const documents = await ctx.db.delete(args.id);

        return documents;
    }
});

export const getSearch = query({
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect();
        
        return documents;
    }
});

export const getById = query({
    args: {documentId: v.id("documents")},
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const document = await ctx.db.get(args.documentId);

        if (!document) {
            throw new Error("Not found");
        }

        if (document.isPublished && !document.isArchived) {
            return document;
        }

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        if (document.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return document;
    }
});

export const update = mutation({
    args: {
        id: v.id("documents"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const { id, ...rest } = args;
        
        const existingDocuments = await ctx.db.get(args.id);

        if (!existingDocuments) {
            throw new Error("Not found");
        }

        if (existingDocuments.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const documents = await ctx.db.patch(args.id, {...rest});

        return documents;
    }
});

export const removeIcons = mutation({
    args: {id: v.id("documents")},
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const existingDocuments = await ctx.db.get(args.id);

        if (!existingDocuments) {
            throw new Error("Not found");
        }

        if (existingDocuments.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const document = await ctx.db.patch(args.id, {
            icon: undefined,
        });

        return document;
    }
});

export const removeCoverImage = mutation({
    args: {id: v.id("documents")},
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const existingDocuments = await ctx.db.get(args.id);

        if (!existingDocuments) {
            throw new Error("Not found");
        }

        if (existingDocuments.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const document = await ctx.db.patch(args.id, {
            coverImage: undefined,
        });

        return document;
    }
});