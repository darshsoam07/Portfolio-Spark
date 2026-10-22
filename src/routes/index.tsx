import { createFileRoute } from "@tanstack/react-router";
import { EditorialPortfolio } from "@/components/editorial/EditorialPortfolio";
export const Route = createFileRoute("/")({ component: EditorialPortfolio });
