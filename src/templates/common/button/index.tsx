import Link from 'next/link'
import { ButtonType } from '@/types/index'

export function Button({ id, label, url }: ButtonType) {
  return (
    label &&
    url && (
      <div key={id}>
        <Link href={url} passHref className="vads-c-action-link--blue">
          {label}
        </Link>
      </div>
    )
  )
}
