import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/shared/lib/utils';

// 버튼 사용할 페이지에 아래 import문 추가
// import { Button } from '@/shared/ui/button'

// variant (색상):

// <Button variant="primary">초록 버튼</Button>
// <Button variant="primaryDisabled">비활성 버튼</Button>
// <Button variant="activ">흰색 버튼</Button>
// size (크기):

// <Button variant="primary" size="L">다음</Button>       {/* 큰 버튼 */}
// <Button variant="primary" size="M">팔로우</Button>     {/* 중간 버튼 */}
// <Button variant="primary" size="Ms">저장</Button>      {/* 작은 버튼 */}
// <Button variant="primary" size="S">팔로우</Button>     {/* 더 작은 버튼 */}
// 실제 사용 예시 (Figma 기준):

// {/* 다음 버튼 */}
// <Button variant="primary" size="L">다음</Button>

// {/* 팔로우/언팔로우 */}
// <Button variant="primary" size="M">팔로우</Button>
// <Button variant="activ" size="M">언팔로우</Button>

// {/* 저장/취소 */}
// <Button variant="primary" size="Ms">저장</Button>
// <Button variant="activ" size="S">취소</Button>

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        primary: 'bg-[#11CC27] text-white hover:bg-[#11CC27]/90 rounded-full',
        primaryDisabled: 'bg-[#A7FFB9] text-white pointer-events-none rounded-full',
        activ: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full',
        myprofilebutton:
          'flex-1 items-center justify-center rounded-full border border-gray-300 py-2 text-foreground hover:bg-gray-50',
        yourprofilebutton:
          'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-foreground transition hover:bg-gray-50',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        L: 'py-[0.8125rem] px-[9.25rem] gap-[0.625rem]',
        M: 'py-2 px-10 gap-[0.625rem]',
        Ms: 'py-[0.625rem] px-[1.9375rem] gap-[0.625rem]',
        S: 'py-[0.625rem] px-[0.6875rem] gap-[0.625rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  type = 'button',
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
