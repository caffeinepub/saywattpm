import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetMaterialPurchasesByProject, useAddMaterialPurchase } from '../../hooks/useQueries';
import { Plus, Loader2, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface MaterialCostTrackerProps {
  projectId: bigint;
  projectValue: number;
}

export default function MaterialCostTracker({ projectId, projectValue }: MaterialCostTrackerProps) {
  const { data: purchases = [], isLoading } = useGetMaterialPurchasesByProject(projectId);
  const addPurchase = useAddMaterialPurchase();

  const [showForm, setShowForm] = useState(false);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [supplier, setSupplier] = useState('');

  const totalSpent = purchases.reduce((sum, p) => sum + p.totalCost, 0);
  const remaining = projectValue - totalSpent;
  const burnRate = projectValue > 0 ? (totalSpent / projectValue) * 100 : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addPurchase.mutateAsync({
        projectId,
        item,
        quantity: parseFloat(quantity),
        unitCost: parseFloat(unitCost),
        supplier,
      });

      toast.success('Material purchase logged');
      setShowForm(false);
      setItem('');
      setQuantity('');
      setUnitCost('');
      setSupplier('');
    } catch (error) {
      toast.error('Failed to log purchase');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Budget Summary */}
      <Card className="border-l-4 border-l-[oklch(0.65_0.22_35)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Budget Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <div className="text-sm text-muted-foreground">Total Budget</div>
              <div className="text-2xl font-bold">${projectValue.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Spent to Date</div>
              <div className="text-2xl font-bold text-[oklch(0.65_0.22_35)]">
                ${totalSpent.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Remaining</div>
              <div className={`text-2xl font-bold ${remaining < 0 ? 'text-destructive' : 'text-foreground'}`}>
                ${remaining.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Burn Rate</span>
              <span className="font-medium">{burnRate.toFixed(1)}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full transition-all ${
                  burnRate > 100 ? 'bg-destructive' :
                  burnRate > 80 ? 'bg-[oklch(0.75_0.15_85)]' :
                  'bg-[oklch(0.65_0.22_35)]'
                }`}
                style={{ width: `${Math.min(burnRate, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Purchase Form */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Material Purchases</CardTitle>
          <Button onClick={() => setShowForm(!showForm)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Log Purchase
          </Button>
        </CardHeader>
        <CardContent>
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-lg border border-border bg-muted/50 p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="item">Item Description *</Label>
                  <Input
                    id="item"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="3/4 inch EMT conduit"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier *</Label>
                  <Input
                    id="supplier"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    placeholder="Home Depot"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.01"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="200"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unitCost">Unit Cost ($) *</Label>
                  <Input
                    id="unitCost"
                    type="number"
                    step="0.01"
                    value={unitCost}
                    onChange={(e) => setUnitCost(e.target.value)}
                    placeholder="1.20"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="h-12 flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-12 flex-1"
                  disabled={addPurchase.isPending}
                >
                  {addPurchase.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging...
                    </>
                  ) : (
                    'Log Purchase'
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Purchase History */}
          {purchases.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No material purchases logged yet
            </div>
          ) : (
            <div className="space-y-3">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id.toString()}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{purchase.item}</h4>
                      <p className="text-sm text-muted-foreground">
                        {purchase.quantity} units @ ${purchase.unitCost.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[oklch(0.65_0.22_35)]">
                        ${purchase.totalCost.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{purchase.supplier}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
