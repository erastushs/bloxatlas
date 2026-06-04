import Image from 'next/image'
import { siteConfig } from '@/constants/site'

type BrandLogoVariant = 'lockup' | 'compact' | 'mark'
type BrandLogoSize = 'sm' | 'md'

type Props = {
  variant?: BrandLogoVariant
  size?: BrandLogoSize
  priority?: boolean
  className?: string
}

const sizeStyles = {
  sm: {
    mark: 32,
    markClassName: 'rounded-control',
    nameClassName: 'text-sm',
    taglineClassName: 'text-xs hidden md:block',
  },
  md: {
    mark: 36,
    markClassName: 'rounded-control',
    nameClassName: 'text-xl',
    taglineClassName: 'text-xs hidden md:block',
  },
}

export default function BrandLogo({ variant = 'lockup', size = 'md', priority = false, className }: Props) {
  const styles = sizeStyles[size]
  const showText = variant !== 'mark'
  const showTagline = variant === 'lockup'

  return (
    <div className={['flex items-center gap-3', className].filter(Boolean).join(' ')}>
      <Image
        src={siteConfig.brand.icon}
        alt={showText ? '' : siteConfig.name}
        width={styles.mark}
        height={styles.mark}
        className={styles.markClassName}
        priority={priority}
      />

      {showText ? (
        <div>
          <p className={`${styles.nameClassName} font-bold leading-tight text-content`}>{siteConfig.name}</p>
          {showTagline ? (
            <p className={`${styles.taglineClassName} mt-1 font-medium text-brand`}>{siteConfig.tagline}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
