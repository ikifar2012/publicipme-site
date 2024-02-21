

import { codeToHtml } from 'shiki'
import  { useEffect, useState } from 'react';
interface jsonHTMLProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string;
    }
export default function JSONHTMLRender(props: jsonHTMLProps) {
    const [html, setHtml] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const data = await codeToHtml(props.code, { lang: 'json', theme: 'dark-plus'});
            // add copy button to html inside the code block top right
            const htmlWithCopyButton = data.replace(
                '</div>',
                '<button class="copy-button" onclick="navigator.clipboard.writeText(this.parentElement.innerText.trim())">Copy</button></div>'
            );
            setHtml(htmlWithCopyButton);

        }
        fetchData();
    }
    , [props.code]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}