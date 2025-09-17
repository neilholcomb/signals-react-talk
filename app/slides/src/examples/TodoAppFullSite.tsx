import { WebsiteWrapper } from "../components/WebsiteWrapper/WebsiteWrapper-hook";
import { Todo } from "./todos/Todo";

interface TodoAppFullSiteProps {
	showRenders?: boolean;
}

export function TodoAppFullSite({ showRenders = false }: TodoAppFullSiteProps) {
	return (
		<WebsiteWrapper showRenders={showRenders} showStats={false}>
			<div
				style={{
					maxWidth: "800px",
					margin: "0 auto",
					padding: "0 1rem",
				}}
			>
				<Todo showRenders={showRenders} />
			</div>
		</WebsiteWrapper>
	);
}
