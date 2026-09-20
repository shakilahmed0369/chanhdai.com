import { DownloadIcon } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/base/ui/button"
import { USER } from "@/features/portfolio/data/user"
import { TextFlip } from "@/registry/components/text-flip"

import { AvatarElectricEffect } from "./avatar-electric-effect"
import { PronounceMyName } from "./pronounce-my-name"
import { VerifiedIcon } from "./verified-icon"

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom flex border-x border-line">
      <div className="shrink-0 border-r border-line">
        <div className="relative mx-0.5 my-0.75">
          <AvatarElectricEffect>
            <Image
              className="size-30 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
              alt="Avatar"
              src={USER.avatar}
              width={120}
              height={120}
              priority
              sizes="(max-width: 640px) 120px, 160px"
            />
          </AvatarElectricEffect>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex grow items-end pb-1 pl-4">
          <div
            className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800"
            aria-hidden
          >
            {"text-3xl "}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {" font-medium"}
          </div>
        </div>

        <div className="border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-3xl font-semibold tracking-tight">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 text-info select-none"
              aria-label="Verified"
            />

            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}

            {USER.resumeUrl && (
              <Button
                className="gradient-border extend-touch-target relative mr-2 ml-auto animate-gradient-border [--gradient-border-duration:6s] [--gradient-border-via:color-mix(in_oklab,var(--color-info)_65%,var(--color-foreground))] [--gradient-border:conic-gradient(from_var(--gradient-border-angle),transparent,var(--gradient-border-via)_30deg,var(--gradient-border-via)_55deg,transparent_90deg)] motion-reduce:animate-none max-sm:w-8 max-sm:px-0"
                variant="outline"
                size="sm"
                nativeButton={false}
                render={
                  <a
                    href={USER.resumeUrl}
                    download
                    aria-label="Download resume"
                  />
                }
              >
                <DownloadIcon />
                <span className="max-sm:hidden">Resume</span>
              </Button>
            )}
          </div>

          <div className="h-12.5 border-t border-line py-1 pl-4 sm:h-9">
            <TextFlip
              className="font-mono text-sm text-balance text-muted-foreground"
              variants={{
                initial: { y: -10, opacity: 0 },
                animate: { y: -1, opacity: 1 },
                exit: { y: 10, opacity: 0 },
              }}
              interval={1.5}
            >
              {USER.flipSentences}
            </TextFlip>
          </div>
        </div>
      </div>
    </div>
  )
}
