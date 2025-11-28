import { useState, useEffect, useLayoutEffect } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $createParagraphNode, $createTextNode, $getRoot, $getSelection, $insertNodes, $setSelection, BLUR_COMMAND, CLEAR_EDITOR_COMMAND, COMMAND_PRIORITY_EDITOR, COMMAND_PRIORITY_LOW } from "lexical";
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';

const HtmlPlugin = ({ initialHtml, onHtmlChanged, resetPage, handlePlainText }) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const prevScroll = { x: window.scrollX, y: window.scrollY };
        const rootEl = editor.getRootElement();
        const origScrollIntoView = rootEl?.scrollIntoView;

        // tạm vô hiệu hóa hành vi scrollIntoView của root (nếu có)
        if (rootEl && typeof rootEl.scrollIntoView === 'function') {
            rootEl.scrollIntoView = () => { };
        }

        editor.update(() => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND);
        });

        editor.update(() => {
            const parser = new DOMParser();
            const dom = parser.parseFromString(initialHtml || '', "text/html");
            const nodes = $generateNodesFromDOM(editor, dom);
            $insertNodes(nodes);
        });

        // restore vào lúc phù hợp (sau commit DOM).
        requestAnimationFrame(() => {
            // restore scrollIntoView method
            if (rootEl && origScrollIntoView) {
                rootEl.scrollIntoView = origScrollIntoView;
            }
            // restore scroll vị trí
            window.scrollTo(prevScroll.x, prevScroll.y);

            // blur editor và restore focus trước đó (preventScroll tránh auto-scroll)
            if (typeof editor.blur === 'function') {
                editor.blur();
            }
        });
    }, [initialHtml, resetPage])

    return (
        <>
            <ClearEditorPlugin />
            <OnChangePlugin
                onChange={(editorState) => {
                    editorState.read(() => {
                        onHtmlChanged($generateHtmlFromNodes(editor));
                        handlePlainText($getRoot().getTextContent());
                    });
                }}
            />
        </>

    );
};

export default HtmlPlugin;