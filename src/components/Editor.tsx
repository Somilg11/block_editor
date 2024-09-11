"use client";
import React from 'react'
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { PartialBlock } from '@blocknote/core';
import { uploadFiles } from '@/utils/uploadthing';

interface EditorProps {
    onChange: () => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor: React.FC<EditorProps> = ({
    onChange,
    initialContent,
    editable
}) => {
    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent?(JSON.parse(initialContent) as PartialBlock[]):undefined,
        uploadFile: async (file) => {
            const [res] = await uploadFiles('imageUploader', {files: [file]});
            return res.url;
        }
    });
    return (
        <BlockNoteView
            editor={editor}
            onChange={onChange}
            editable={editable}
            theme="light"
        />
    )
}

export default Editor