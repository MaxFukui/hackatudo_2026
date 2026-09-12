interface AvatarProps {
  name: string
  src?: string | null
  size?: number
}

export function Avatar({ name, src, size = 36 }: AvatarProps) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  const style = { width: size, height: size }

  return src ? (
    <img src={src} alt={name} style={style} className="rounded-full object-cover" />
  ) : (
    <span
      style={style}
      aria-label={name}
      className="inline-flex items-center justify-center rounded-full bg-accent/30 text-xs font-semibold text-primary-strong"
    >
      {initials}
    </span>
  )
}
