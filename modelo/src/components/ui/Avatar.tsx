interface AvatarProps {
  name: string
  src?: string | null
  size?: 'sm' | 'md' | 'lg'
}

const SIZE = { sm: 'size-7 text-caption', md: 'size-9 text-small', lg: 'size-12 text-body' }

export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

  return src ? (
    <img src={src} alt={name} className={`rounded-full object-cover ${SIZE[size]}`} />
  ) : (
    <span
      role="img"
      aria-label={name}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary-soft-fg ${SIZE[size]}`}
    >
      {initials}
    </span>
  )
}
