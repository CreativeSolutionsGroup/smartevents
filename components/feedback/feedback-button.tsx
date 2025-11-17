"use client";

import { Button } from "@/components/ui/button";
import { Bug } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function FeedbackButton() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button size="icon" variant="outline" className="fixed bottom-4 right-4 z-50 rounded-full">
                    <a href="https://forms.office.com/r/DbgedKRdxV" target="_blank"><Bug /></a>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                Give us your feedback!
            </TooltipContent>
        </Tooltip>
    );
}