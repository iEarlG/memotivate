"use client"

import "@blocknote/core/style.css";

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    initialContent?: string;
    editable?: boolean;
    onChange: (value: string) => void;
};

const Editor = ({
    initialContent,
    editable,
    onChange
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUploadContent = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file,
        });

        return response.url;
    };

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
        uploadFile: handleUploadContent
    });

    return (
        <BlockNoteView 
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            editor={editor}
        />
    )
};

export default Editor;