DROP POLICY "orders_select_kitchen" ON public.orders;
DROP POLICY "orders_update_kitchen" ON public.orders;
DROP FUNCTION IF EXISTS public.claim_kitchen_access();
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

CREATE POLICY "orders_select_kitchen" ON public.orders FOR SELECT TO authenticated
USING (
  (auth.jwt() ->> 'email') = 'burgueramostra@gmail.com'
  OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('cozinha','admin'))
);
CREATE POLICY "orders_update_kitchen" ON public.orders FOR UPDATE TO authenticated
USING (
  (auth.jwt() ->> 'email') = 'burgueramostra@gmail.com'
  OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('cozinha','admin'))
)
WITH CHECK (
  (auth.jwt() ->> 'email') = 'burgueramostra@gmail.com'
  OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('cozinha','admin'))
);

REVOKE ALL ON FUNCTION public.touch_orders_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.award_loyalty_points() FROM PUBLIC, anon, authenticated;